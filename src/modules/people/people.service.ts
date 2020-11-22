import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleAPIService : SalesloftPeopleService) {}

  async list(page:number , resultsPerPage:number, sortBy:string, sortDirection:string) {
    const response = await this.peopleAPIService.list({page,per_page:resultsPerPage,sort_by:sortBy, sort_direction:sortDirection}).toPromise();

    return response.data;
  }
}
