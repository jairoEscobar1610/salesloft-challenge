import { HttpService, Injectable } from "@nestjs/common";
import { People } from "common/models/people.model";
import { IPeople } from "./people.interface";
import { Observable } from 'rxjs';
import { AxiosResponse} from 'axios';
import { SalesloftConfigService } from "config/vendors/salesloft";

@Injectable()
export class SalesloftPeopleService implements IPeople{
    constructor(private httpService: HttpService, private salesloftConfig : SalesloftConfigService){}

    list(page:number, sortBy:string, sortDirection:string):Observable<AxiosResponse<People[]>> {
        return this.httpService.get(`${this.salesloftConfig.apiUrl}people.json`);
    }
}