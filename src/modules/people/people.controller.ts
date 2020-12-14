import { CACHE_MANAGER, Controller, Get, HttpException, HttpStatus, Inject, Logger, Query, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { stringCharFrequency } from 'common/helpers/character-classificator.helper';
import { PeopleListDTO } from 'common/validators/people-list.dto';
import { PeopleService } from './people.service';
import { jaroWrinkerTest, stringSimilarityArray } from 'common/helpers/string-similarity.helper';
import { flatten } from 'common/helpers/array.helper';
import { SalesloftConfigService } from 'config/vendors/salesloft';

@Controller('api/people')
@ApiTags('people')
export class PeopleController {
    private readonly logger = new Logger(PeopleController.name);

    constructor(private readonly peopleService: PeopleService,
        private salesloftConfigService: SalesloftConfigService) { }

    /**
     * Get People List using Salesloft API
     * @param query : PeopleListDTO
     * @returns response<People[]>
     */
    @Get('list')
    @ApiResponse({ status: 200, description: 'Successful Response: Array<SalesloftPeopleResponse>' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 422, description: 'Salesloft Parameter API Error' })
    @ApiResponse({ status: 500, description: 'Unexpected API Error' })
    async getPeopleList(@Query() query: PeopleListDTO): Promise<any> {
        const { page, sort_by, sort_direction, per_page } = query;
        try {
            /* tslint:disable-next-line */
            const response = await this.peopleService.list({ page, per_page, sort_by, sort_direction });
            return response;
        } catch (error) {
            if (error && error.response) {
                throw new HttpException('Salesloft API Error', error.response.status);
            } else {
                // TODO: Implement decoupled logger system
                this.logger.error('getPeopleList Error:',error);
                throw new HttpException('Unexpected API Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }

    /**
     * Get People List character frequency using Salesloft API
     * @returns response<CharacterFrequency[]>
     */
    @Get('character-frequency')
    @ApiResponse({ status: 200, description: 'Successful Response: {key: string, frequency:number}[]' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 422, description: 'Salesloft Parameter API Error' })
    @ApiResponse({ status: 500, description: 'Unexpected API Error' })
    async getCharacterFrequency(): Promise<any> {
        try {
            const listChunkSize = this.salesloftConfigService.peopleListPerPage || 50;
            const listRequestConcurrency = this.salesloftConfigService.peopleListConcurrency || 20;
            /* tslint:disable-next-line */
            let resultSet: any = {};
            let responses = [];
            const ControlledPromise = require('bluebird');

            // Get all possible values
            responses = await this.peopleService.listAll(listChunkSize, listRequestConcurrency);


            // Split characters and store them in Map - concurrent O(nk)
            const results = await ControlledPromise.map(responses,
                (res, index) => stringCharFrequency(
                    res.data,
                    (value: any) => value.email_address,
                    resultSet
                ),
                { concurrency: listRequestConcurrency }
            );

            // Transform resultset into array to be sorted O(n)
            const arraySet = Object.keys(resultSet.frequency).map(key => ({ key, frequency: resultSet.frequency[key] }));

            // Sort Values O(nlog(n))
            const sortedSet = arraySet.sort((a, b) => b.frequency - a.frequency);

            return sortedSet;
        } catch (error) {
            if (error && error.response) {
                throw new HttpException('Salesloft API Error', error.response.status);
            } else {
                // TODO: Implement decoupled logger system
                this.logger.error('getCharacterFrequency Error:',error);
                throw new HttpException('Unexpected API Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }

    /**
     * Get People List posible duplicates using Salesloft API
     * @returns response<Groups[]>
     */
    @Get('duplicates')
    @ApiResponse({ status: 200, description: 'Successful Response: {groups:[]}' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 422, description: 'Salesloft Parameter API Error' })
    @ApiResponse({ status: 500, description: 'Unexpected API Error' })
    async getDuplicates(): Promise<any> {
        try {
            const listChunkSize = this.salesloftConfigService.peopleListPerPage || 50;
            const listRequestConcurrency = this.salesloftConfigService.peopleListConcurrency || 20;
            let responses = [];

            // Get all possible values
            responses = await this.peopleService.listAll(listChunkSize, listRequestConcurrency);

            // Generate array only from the People data
            /* tslint:disable-next-line */
            let flattenResponses = flatten(responses, 'data');


            // Run the string similarity algorithm against the results
            const results = await stringSimilarityArray(flattenResponses,
                (value: any, index) => value.email_address,
                jaroWrinkerTest,
                (this.salesloftConfigService.duplicateThreshold || 0.95)
            );
            return results;
        } catch (error) {
            if (error && error.response) {
                throw new HttpException('Salesloft API Error', error.response.status);
            } else {
                // TODO: Implement decoupled logger system
                this.logger.error('getDuplicates Error:',error);
                throw new HttpException('Unexpected API Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }
}
