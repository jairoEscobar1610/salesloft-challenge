import { Test, TestingModule } from '@nestjs/testing';

import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';
import { PeopleService } from './people.service';
import { People } from "../../common/models/people.model";
import { CacheModule, HttpException } from '@nestjs/common';
import { AppConfigModule } from 'config/app';
import { AxiosResponse } from 'axios';
import { axios200, axios422, axiosResponses, axiosResposeWithData } from 'common/mockups/axios-response.mockup';
import { Observable, of } from 'rxjs';

describe('PeopleService', () => {
  let peopleService: PeopleService;
  let peopleAPIService: SalesloftPeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SalesloftProviderModule, AppConfigModule, CacheModule.register()],
      controllers: [],
      providers: [PeopleService]
    }).compile();

    peopleService = module.get<PeopleService>(PeopleService);
    peopleAPIService = module.get<SalesloftPeopleService>(SalesloftPeopleService);
  });

  it('should be defined', () => {
    expect(peopleService).toBeDefined();
  });

  describe('list', () => {

    it('should return an array of people with no parameters', async () => {
      const result = of(axiosResponses[200]);
      jest.spyOn(peopleAPIService, 'list').mockImplementation(() => result);
      expect(await peopleService.list({})).toEqual(axiosResponses[200].data);
    });

    it('should return an array of people, supporting page, page_per, sort_by and sort_direction parameters', async () => {
      const result = of(axiosResponses[200]);
      jest.spyOn(peopleAPIService, 'list').mockImplementation(() => result);
      expect(await peopleService.list({ page: 1, per_page: 25, sort_by: 'updated_at', sort_direction: 'ASC' })).toEqual(axiosResponses[200].data);
    });

    it('should return an exception when using invalid parameters: sort_by', async () => {
      const result = of(axiosResponses[422]);
      const queryParams = { sort_by: 'email_address' };
      jest.spyOn(peopleAPIService, 'list').mockImplementation(() => result);

      expect(await peopleService.list(queryParams)).toEqual(axiosResponses[422].data);

    });
  });

  describe('listAll', () => {

    it('should return an empty array when salesloft does not provide data', async () => {
      const result = of(axiosResposeWithData(200, []));
      jest.spyOn(peopleAPIService, 'list').mockImplementation(() => result);
      expect(await peopleService.listAll()).toEqual([]);
    });

    it('should return an empty array when salesloft does not provide data, supporting chunks', async () => {
      const result = of(axiosResposeWithData(200, []));
      jest.spyOn(peopleAPIService, 'list').mockImplementation(() => result);
      expect(await peopleService.listAll(50)).toEqual([]);
    });

    it('should return People response when salesloft provides data on the response', async () => {
      //Mock response
      const mockResponse = {
        metadata: { paging: { total_pages: 1, current_page: 1 } },
        data: [{ email_address: 'a@e' }, { email_address: 'a@y' }, { email_address: 'a@a.a.a.e.a' }]
      };

      const result = of(axiosResposeWithData(200, mockResponse));


      jest.spyOn(peopleAPIService, 'list').mockImplementation(() => result);
      expect(await peopleService.listAll()).toEqual([mockResponse]);
    });

    it('should return People response when salesloft provides data on the response, supporting chunks', async () => {
      //Mock response
      const mockResponse = {
        metadata: { paging: { total_pages: 1, current_page: 1 } },
        data: [{ email_address: 'a@e' }, { email_address: 'a@y' }, { email_address: 'a@a.a.a.e.a' }]
      };

      const result = of(axiosResposeWithData(200, mockResponse));

      jest.spyOn(peopleAPIService, 'list').mockImplementation(() => result);
      expect(await peopleService.listAll(50)).toEqual([mockResponse]);
    });

  });


});
