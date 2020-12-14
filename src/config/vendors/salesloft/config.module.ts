import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { SalesloftConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        SALESLOFT_API_KEY: Joi.string(),
        SALESLOFT_API_URL: Joi.string().default('https://api.salesloft.com/v2/'),
        SALESLOFT_DUPLICATE_THRESHOLD: Joi.number(),
        SALESLOFT_PEOPLE_LIST_CONCURRENCY: Joi.number().default(20),
        SALESLOFT_PEOPLE_LIST_PER_PAGE: Joi.number().default(100)
      }),
    }),
  ],
  providers: [ConfigService, SalesloftConfigService],
  exports: [ConfigService, SalesloftConfigService],
})
export class SalesloftConfigModule {}