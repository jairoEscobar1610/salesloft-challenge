import { registerAs } from '@nestjs/config';

export default registerAs('salesloft', () => ({
    apiKey: process.env.SALESLOFT_API_KEY,
    apiUrl: process.env.SALESLOFT_API_URL,
    duplicateThreshold: process.env.SALESLOFT_DUPLICATE_THRESHOLD
}))