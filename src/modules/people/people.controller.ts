import { Controller, Get, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Person } from './people.entity';
import { PeopleService } from './people.service';

@Controller('api/people')
@ApiTags('people')
export class PeopleController {
    constructor(private readonly peopleService : PeopleService){}
    @Get('list')
    @ApiResponse({ status: 200, description: 'Successful Response' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getPeopleList(@Query() query): Promise<any> {
        const {page, sortBy, sortDirection,resultsPerPage} = query;
        try{
            const response = await this.peopleService.list(page,resultsPerPage,sortBy,sortDirection);
            return response;
        }catch(error){
            if(error && error.response){
                throw new HttpException('Salesloft API Error',error.response.status);
            }else{
                throw new HttpException('Unexpected API Error',HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }
}
