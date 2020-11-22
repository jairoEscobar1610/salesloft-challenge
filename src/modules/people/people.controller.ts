import { Controller, Get, Query, Request } from '@nestjs/common';
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
        const {page, sortBy, sortDirection} = query;
        return await this.peopleService.list(page,sortBy,sortDirection);
    }
}
