import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleAPIService : SalesloftPeopleService) {}

  async list(page:number = 1, sortBy:string = 'email', sortDirection:string = 'ASC') {
    return this.peopleAPIService.list(page,sortBy,sortDirection).toPromise();
  }
}
