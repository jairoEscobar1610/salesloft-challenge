import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    env: process.env.APP_ENV,
    url: process.env.APP_URL,
    port: process.env.APP_PORT,
    requestLimit: process.env.APP_REQUEST_LIMIT,
    requestLimitWindow: process.env.APP_REQUEST_LIMIT_WINDOW,
    cacheTTL: process.env.APP_CACHE_TTL
}))