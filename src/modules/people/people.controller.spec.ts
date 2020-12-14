import { Test, TestingModule } from '@nestjs/testing';

import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { SalesloftConfigModule } from 'config/vendors/salesloft';
import { AppConfigModule } from 'config/app';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People } from "./../../common/models/people.model";
import { CacheModule, HttpException, UnprocessableEntityException } from '@nestjs/common';
import { of } from 'rxjs';

describe('PeopleController', () => {
  let peopleCotroller: PeopleController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[SalesloftProviderModule, SalesloftConfigModule, AppConfigModule, CacheModule.register()],
      controllers: [PeopleController],
      providers: [PeopleService]
    }).compile();

    peopleCotroller = module.get<PeopleController>(PeopleController);
    peopleService = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(peopleCotroller).toBeDefined();
  });

  describe('getPeopleList', () => {
    
    it('should return an array of people with no parameters', async () => {
      const result = [new People()];
      jest.spyOn(peopleService,'list').mockImplementation(async ()=> result);
      expect(await peopleCotroller.getPeopleList({})).toEqual(result);
    });

    it('should return an array of people, supporting page, page_per, sort_by and sort_direction parameters', async () => {
      const result = [new People()];
      jest.spyOn(peopleService,'list').mockImplementation(async ()=> result);
      expect(await peopleCotroller.getPeopleList({page:1, per_page:25, sort_by:'updated_at',sort_direction:'ASC'})).toEqual(result);
    });

    it('should return an exception when using invalid parameters: sort_by', async (done) => {
      const result = [new People()];
      const queryParams = {sort_by:'email_address'};

      const response = (['created_at','updated_at','last_contacted_at'].includes(queryParams.sort_by)) ?
        result : new HttpException('Invalid Parameter',422);

      jest.spyOn(peopleService,'list').mockImplementation(() => new Promise((resolve,reject)=>reject(response)));

      peopleCotroller.getPeopleList({sort_by:'email_address'}).catch(error=>{expect(error.response).toBe('Salesloft API Error'); done();});
      
    });

    it('should return an exception when catching an unexpected response', async (done) => {
      const response =  new Error('Internal Error');

      jest.spyOn(peopleService,'list').mockImplementation(() => new Promise((resolve,reject)=>reject(response)));

      peopleCotroller.getPeopleList({sort_by:'email_address'}).catch(error=>{expect(error.response).toBe('Unexpected API Error'); done();});
      
    });
    
  });

  describe('getCharacterFrequency', () => {
    it('should return the correct frequency for a given response', async () => {
      //Prepare test payload
      const result = [{
        metadata: { paging: { total_pages: 1, current_page: 1 } },
        data: [{ email_address: 'a@e' }, { email_address: 'a@y' }, { email_address: 'a@a.a.a.e.a' }]
      }];
      jest.spyOn(peopleService,'listAll').mockImplementation(async ()=> result);
      expect(await peopleCotroller.getCharacterFrequency()).toEqual([
        {'key':'a', 'frequency':7},{'key':'.', 'frequency':4},
        {'key':'@', 'frequency':3},{'key':'e', 'frequency':2},{'key':'y', 'frequency':1}
      ]);
    });

    it('should return an empty frequency array when people API responds with empty data', async () => {
      //Prepare test payload
      const result = [{
        metadata: { paging: { total_pages: 1, current_page: 1 } },
        data: []
      }];

      jest.spyOn(peopleService,'listAll').mockImplementation(async ()=> result);
      expect(await peopleCotroller.getCharacterFrequency()).toEqual([]);
    });

    it('should handle the Salesloft API exceptions', async (done) => {
      //Prepare test payload (Exception)
      const response = new HttpException('Invalid Parameter',422);

      jest.spyOn(peopleService,'listAll').mockImplementation(() => new Promise((resolve,reject)=>reject(response)));

      peopleCotroller.getCharacterFrequency().catch(error=>{expect(error.response).toBe('Salesloft API Error'); done();});
    });

    it('should return an exception when catching an unexpected response', async (done) => {
      const response =  new Error('Internal Error');

      jest.spyOn(peopleService,'listAll').mockImplementation(() => new Promise((resolve,reject)=>reject(response)));

      peopleCotroller.getCharacterFrequency().catch(error=>{expect(error.response).toBe('Unexpected API Error'); done();});
      
    });
  });

  describe('getDuplicates', () => {
    it('should return the correct duplicate group for a given response', async () => {
      //Prepare test payload
      const result = [{
        metadata: { paging: {total_pages:1, current_page:1}},
        data:[{email_address:'testexample@example.com'},
        {email_address:'testexampl@example.com'},
        {email_address:'testexampel@example.com'},
        {email_address:'another.example.not.duplicate@example.com'}]}];
      jest.spyOn(peopleService,'listAll').mockImplementation(async ()=> result);

      expect(await peopleCotroller.getDuplicates()).toEqual({
        groups:[
          ['testexample@example.com','testexampl@example.com','testexampel@example.com']
      ]});
    });

    it('should return an empty group array when people API responds with non-related emails', async () => {
      //Prepare test payload
      const result = [{
        metadata: { paging: {total_pages:1, current_page:1}},
        data:[{email_address:'testexample@example.com'},
        {email_address:'another@gmail.com'},
        {email_address:'testexampel_here@outlook.com.es'},
        {email_address:'another.example.not.duplicate@example.com'}]}];
      
      jest.spyOn(peopleService,'listAll').mockImplementation(async ()=> result);
      expect(await peopleCotroller.getDuplicates()).toEqual({
        groups:[]
      });
    });

    it('should handle the Salesloft API exceptions', async (done) => {
      //Prepare test payload (Exception)
      const response = new HttpException('Invalid Parameter',422);

      jest.spyOn(peopleService,'listAll').mockImplementation(() => new Promise((resolve,reject)=>reject(response)));

      peopleCotroller.getDuplicates().catch(error=>{expect(error.response).toBe('Salesloft API Error'); done();});
    });

    it('should return an exception when catching an unexpected response', async (done) => {
      const response =  new Error('Internal Error');

      jest.spyOn(peopleService,'listAll').mockImplementation(() => new Promise((resolve,reject)=>reject(response)));

      peopleCotroller.getCharacterFrequency().catch(error=>{expect(error.response).toBe('Unexpected API Error'); done();});
      
    });
  });

  
});
