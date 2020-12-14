import * as crypto from 'crypto';
import { CACHE_MANAGER, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';
import { PeopleListDTO } from 'common/validators/people-list.dto';
import { Cache } from 'cache-manager';
import * as moment from 'moment'
import { AppConfigService } from 'config/app';
import { initialize } from 'common/helpers/array.helper';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleAPIService: SalesloftPeopleService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache, private appConfigService: AppConfigService) { }

  /**
   * Get People list for the given parameters
   * @param peopleListParams @type PeopleListDTO
   * returns SalesloftPeopleResponse
   */
  async list(peopleListParams: PeopleListDTO) {
    const response = await this.peopleAPIService.list(peopleListParams).toPromise();

    return response.data;
  }

  /**
   * Get all available people, performing multiple requests
   * @param chunkSize elements per response
   * @param concurrency number of concurrent requests
   * @returns [salesloftPeopleResponse]
   */
  async listAll(chunkSize: number = 50, concurrency: number = 20) {
    const ControlledPromise = require('bluebird');
    let splitOperations = []; // To perform Promise.all
    const page = 1; // Initial value
    let total_pages = 0;
    let peopleListQuery: PeopleListDTO = { page, per_page: chunkSize };

    // Check for existing data on cache
    const cachedResponses = await this.cacheManager.get('people:list:all');
    // If there is existing data
    if (cachedResponses) {
      // Check the difference between current datetime and previously stored timestamp
      if (moment(cachedResponses.timestamp).add(30, 'seconds').isAfter(new Date())) {
        // If less than 30 seconds, return the current data
        return cachedResponses.data;
      }

      // If greater than 1 minute, modify the people list query to get the latest data only
      peopleListQuery = {
        ...peopleListQuery,
        sort_by: 'updated_at',
        sort_direction: 'ASC',
        'updated_at[gt]': cachedResponses.timestamp
      }
    }

    // Perform first checking
    const response = await this.peopleAPIService.list(peopleListQuery).toPromise();

    // If response is empty
    if (!response.data || response.data.length === 0) {
      return (cachedResponses ? cachedResponses.data : []);
    }

    // Get total pages
    total_pages = response.data.metadata.paging.total_pages;

    // Initialize array to perform concurrent requests
    splitOperations = initialize(splitOperations, Math.max(0, total_pages - 1), 0);

    // Get all possible values
    const responses = await ControlledPromise.map(splitOperations,
      (val, index) => this.peopleAPIService.list({ page: (index + 2), per_page: chunkSize }).toPromise(),
      { concurrency }
    );

    // Merge first request, cached data and new data
    const mergedResponses = [response, ...responses].map(res => res.data);

    // Merge cached response
    const peopleList = [ ...(cachedResponses ? cachedResponses.data : []), ...mergedResponses];

    await this.cacheManager.set('people:list:all',
      { timestamp: new Date(), data: peopleList },
      { ttl: this.appConfigService.cacheTTL || 7600 }); // Store in cache

    return peopleList;
  }
}
