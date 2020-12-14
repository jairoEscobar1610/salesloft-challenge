import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PeopleListDTO {
    @ApiPropertyOptional({ description: 'SalesLoft People - Page number', default: 1 })
    @IsOptional()
    @IsNumberString()
    page?: number;

    @ApiPropertyOptional({ description: 'SalesLoft People - Results per page', default: 25 })
    @IsOptional()
    @IsNumberString()
    per_page?: number;

    @ApiPropertyOptional({
        description: 'SalesLoft People - Key to sort on, must be one of: created_at, updated_at, last_contacted_at.',
        default: 'updated_at'
    })
    @IsOptional()
    @IsString()
    sort_by?: string;

    @ApiPropertyOptional({ description: 'SalesLoft People - Sort direction, must be one of: ASC, DESC', default: 'ASC' })
    @IsOptional()
    @IsString()
    sort_direction?: string;

    @ApiPropertyOptional({ description: 'SalesLoft People - updated_at filter - greater than a given date' })
    @IsOptional()
    @IsString()
    'updated_at[gt]'?: string;
}