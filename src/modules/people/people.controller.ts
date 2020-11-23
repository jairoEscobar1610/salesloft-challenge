import { Controller, Get, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { stringCharFrequency } from 'common/helpers/character-classificator.helper';
import { PeopleListDTO } from 'common/validators/people-list.dto';
import { response } from 'express';
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

    /**
     * Get People List character frequency using Salesloft API
     * @returns response<People[]>
     */
    @Get('character-frequency')
    @ApiResponse({ status: 200, description: 'Successful Response' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 422, description: 'Salesloft API Error' })
    @ApiResponse({ status: 500, description: 'Unexpected API Error' })
    async getCharacterFrequency(): Promise<any> {
        try{
            const per_page = 50; //Maximum value
            let page = 1; //Initial value
            let total_pages = 0; 
            let resultSet:any = {};
            let splitOperations = []; //To perform Promise.all

            let ControlledPromise = require('bluebird');

            
            
            //Perform first checking
            const response = await this.peopleService.list({ page, per_page });
            total_pages = response.metadata.paging.total_pages;
            page = response.metadata.paging.current_page;

            splitOperations.length = total_pages - 1;
            splitOperations.fill(0); //This is going to be used for 'concurrent' iterations

            //Get all possible values
            let responses = await ControlledPromise.map(splitOperations,
                (val, index) => this.peopleService.list({page:(index+2), per_page}),
                {concurrency:20}
            );

            //Split characters and store them in Map - concurrent O(nk)
            let results = await ControlledPromise.map([response,...responses],
                (response, index) => stringCharFrequency(
                    response.data,
                    (value:any)=>value.email_address,
                    resultSet
                ),
                {concurrency:20}
            );

            

           
            //Transform resultset into array to be sorted O(n)
            let arraySet = Object.keys(resultSet.frequency).map(key=>({key,frequency:resultSet.frequency[key]}));

            //Sort Values O(nlog(n))
            let sortedSet = arraySet.sort((a,b)=> b.frequency - a.frequency);
            
            return sortedSet;
        }catch(error){
            console.log(error);
            if(error && error.response){
                throw new HttpException('Salesloft API Error',error.response.status);
            }else{
                throw new HttpException('Unexpected API Error',HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }
}
