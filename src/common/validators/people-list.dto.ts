import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class PeopleListDTO {
    @ApiPropertyOptional({description:'Salesloft People - Page number', default:1})
    @IsOptional()
    @IsNumberString()
    page?:number;
    
    @ApiPropertyOptional({description:'Salesloft People - Results per page', default:25})
    @IsOptional()
    @IsNumberString()
    per_page?:number; 

    @ApiPropertyOptional({description:'Salesloft People - Key to sort on, must be one of: created_at, updated_at, last_contacted_at.', 
        default:'updated_at'})
        @IsOptional()
    @IsString()
    sort_by?:string; 

    @ApiPropertyOptional({description:'Salesloft People - Sort direction, must be one of: ASC, DESC', default:'ASC'})
    @IsOptional()
    @IsString()
    sort_direction?:string;
}