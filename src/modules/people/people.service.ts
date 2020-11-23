import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';
import { PeopleListDTO } from 'common/validators/people-list.dto';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleAPIService : SalesloftPeopleService) {}

  async list(peopleListParams : PeopleListDTO) {
    const response = await this.peopleAPIService.list(peopleListParams).toPromise();

    return response.data;
  }
}
