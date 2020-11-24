import { HttpService, Injectable } from '@nestjs/common';
import { People } from 'common/models/people.model';
import { IPeople } from './people.interface';
import { Observable } from 'rxjs';
import { AxiosResponse} from 'axios';
import { SalesloftConfigService } from 'config/vendors/salesloft';
import { PeopleListDTO } from 'common/validators/people-list.dto';

/* tslint:disable-next-line */
const queryString = require('query-string');

@Injectable()
export class SalesloftPeopleService implements IPeople{
    constructor(private httpService: HttpService, private salesloftConfig : SalesloftConfigService){}

    list(params : PeopleListDTO):Observable<AxiosResponse<any>> {
        const stringParams = queryString.stringify({...params,include_paging_counts:'true'});
        return this.httpService.get(`${this.salesloftConfig.apiUrl}people.json?${stringParams}`);
    }
}