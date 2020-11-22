import { People } from "common/models/people.model";
import { Observable } from 'rxjs';
import { AxiosResponse} from 'axios';

export interface IPeople {
    list(page:number, sortBy:string, sortDirection:string):Observable<AxiosResponse<People[]>>
}