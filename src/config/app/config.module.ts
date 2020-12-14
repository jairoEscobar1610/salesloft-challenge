import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      load: [configuration],
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('dev', 'prod', 'test', 'staging')
          .default('dev'),
        APP_URL: Joi.string().default('http://localhost'),
        APP_PORT: Joi.number().default(3000),
        APP_REQUEST_LIMIT: Joi.number(),
        APP_REQUEST_LIMIT_WINDOW: Joi.number(),
        APP_CACHE_TTL: Joi.number().default(7200)
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}