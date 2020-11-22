import { IsNumber, IsString } from "class-validator";

export class PeopleListDTO {
    @IsNumber()
    page:number;
    @IsNumber()
    per_page:number; 
    @IsString()
    sort_by:string; 
    @IsString()
    sort_direction:string;
}