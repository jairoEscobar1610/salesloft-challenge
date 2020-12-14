import { registerAs } from '@nestjs/config';

export default registerAs('salesloft', () => ({
    apiKey: process.env.SALESLOFT_API_KEY,
    apiUrl: process.env.SALESLOFT_API_URL,
    duplicateThreshold: process.env.SALESLOFT_DUPLICATE_THRESHOLD,
    peopleListConcurrency: process.env.SALESLOFT_PEOPLE_LIST_CONCURRENCY,
    peopleListPerPage: process.env.SALESLOFT_PEOPLE_LIST_PER_PAGE
}))