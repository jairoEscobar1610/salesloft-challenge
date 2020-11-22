import { People } from "common/models/people.model";
import { Observable } from 'rxjs';
import { AxiosResponse} from 'axios';
import { PeopleListDTO } from "common/validators/people-list.dto";

export interface IPeople {
    list(params : PeopleListDTO):Observable<AxiosResponse<People[]>>
}