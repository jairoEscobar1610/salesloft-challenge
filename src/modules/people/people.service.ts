import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';
import { PeopleListDTO } from 'common/validators/people-list.dto';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleAPIService: SalesloftPeopleService) { }

  async list(peopleListParams: PeopleListDTO) {
    const response = await this.peopleAPIService.list(peopleListParams).toPromise();

    return response.data;
  }

  async listAll() {
    const per_page = 50; //Maximum value
    let page = 1; //Initial value
    let total_pages = 0; 
    let splitOperations = []; //To perform Promise.all
    let ControlledPromise = require('bluebird');

    //Perform first checking
    const response = await this.peopleAPIService.list({ page, per_page }).toPromise();
    total_pages = response.data.metadata.paging.total_pages;
    page = response.data.metadata.paging.current_page;

    splitOperations.length = total_pages - 1;
    splitOperations.fill(0); //This is going to be used for 'concurrent' iterations

    //Get all possible values
    let responses = await ControlledPromise.map(splitOperations,
      (val, index) =>this.peopleAPIService.list({ page: (index + 2), per_page }).toPromise(),
      { concurrency: 20 }
    );

    return [response, ...responses].map(response=>response.data);
  }
}
