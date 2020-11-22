import { Controller, Get, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PeopleListDTO } from 'common/validators/people-list.dto';
import { Person } from './people.entity';
import { PeopleService } from './people.service';

@Controller('api/people')
@ApiTags('people')
export class PeopleController {
    constructor(private readonly peopleService : PeopleService){}

    /**
     * Get People List using Salesloft API
     * @param query : PeopleListDTO
     * @returns response<People[]>
     */
    @Get('list')
    @ApiResponse({ status: 200, description: 'Successful Response' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 422, description: 'Salesloft API Error' })
    @ApiResponse({ status: 500, description: 'Unexpected API Error' })
    async getPeopleList(@Query() query: PeopleListDTO): Promise<any> {
        const {page, sort_by, sort_direction,per_page} = query;
        try{
            const response = await this.peopleService.list({page,per_page,sort_by,sort_direction});
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
