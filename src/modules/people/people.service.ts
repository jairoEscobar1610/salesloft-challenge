import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';
import { PeopleListDTO } from 'common/validators/people-list.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleAPIService: SalesloftPeopleService) { }

  /**
   * Get People list for the given parameters
   * @param peopleListParams @type PeopleListDTO
   * returns SalesloftPeopleResponse
   */
  async list(peopleListParams: PeopleListDTO) {
    const response = await this.peopleAPIService.list(peopleListParams).toPromise();

    return response.data;
  }

  /**
   * Get all available people, performing multiple requests
   * @param chunkSize elements per response
   * @param concurrency number of concurrent requests
   * @returns [salesloftPeopleResponse]
   */
  async listAll(chunkSize: number = 50, concurrency: number = 20) {
    let page = 1; // Initial value
    let total_pages = 0;
    const splitOperations = []; // To perform Promise.all
    const ControlledPromise = require('bluebird');

    // Perform first checking
    const response = await this.peopleAPIService.list({ page, per_page: chunkSize }).toPromise();

    // If response is empty
    if (!response.data || response.data.length === 0) {
      return [];
    }
    total_pages = response.data.metadata.paging.total_pages;
    page = response.data.metadata.paging.current_page;

    splitOperations.length = total_pages - 1;
    splitOperations.fill(0); // This is going to be used for 'concurrent' iterations

    // Get all possible values
    const responses = await ControlledPromise.map(splitOperations,
      (val, index) => this.peopleAPIService.list({ page: (index + 2), per_page: chunkSize }).toPromise(),
      { concurrency }
    );

    return [response, ...responses].map(res => res.data);
  }
}
