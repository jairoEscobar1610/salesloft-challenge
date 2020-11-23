import { Test, TestingModule } from '@nestjs/testing';

import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People } from "./../../common/models/people.model";
import { HttpException } from '@nestjs/common';
import { of } from 'rxjs';

describe('PeopleController', () => {
  let peopleCotroller: PeopleController;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[SalesloftProviderModule],
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
      expect(await peopleCotroller.getPeopleList({})).toBe(result);
    });

    it('should return an array of people, supporting page, page_per, sort_by and sort_direction parameters', async () => {
      const result = [new People()];
      jest.spyOn(peopleService,'list').mockImplementation(async ()=> result);
      expect(await peopleCotroller.getPeopleList({page:1, per_page:25, sort_by:'updated_at',sort_direction:'ASC'})).toBe(result);
    });

    it('should return an exception when using invalid parameters: sort_by', async (done) => {
      const result = [new People()];
      const queryParams = {sort_by:'email_address'};

      const response = (['created_at','updated_at','last_contacted_at'].includes(queryParams.sort_by)) ?
        result : new HttpException('Invalid Parameter',422);

      jest.spyOn(peopleService,'list').mockImplementation(() => new Promise((resolve,reject)=>reject(response)));

      peopleCotroller.getPeopleList({sort_by:'email_address'}).catch(error=>{expect(error.response).toBe('Salesloft API Error'); done();});
      
    });
    
  });

  
});
