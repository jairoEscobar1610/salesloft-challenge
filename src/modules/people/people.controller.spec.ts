import { Test, TestingModule } from '@nestjs/testing';

import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { People } from "./../../common/models/people.model";

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
    
    it('should return an array of people', async () => {
      const result = [new People()];
      jest.spyOn(peopleService,'list').mockImplementation(async ()=> result);
      expect(await peopleCotroller.getPeopleList({})).toBe(result);
    });
  
    
  });
});
