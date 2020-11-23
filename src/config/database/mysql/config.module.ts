import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MysqlConfigService } from './config.service';
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
        DB_TYPE: Joi.string().valid('mysql', 'mariadb').default('mysql'),
        DB_USERNAME: Joi.string().default('root'),
        DB_PASSWORD: Joi.string(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.string().default(3306),
        DB_DATABASE: Joi.string().default('salesloft'),
      }),
    }),
  ],
  providers: [ConfigService, MysqlConfigService],
  exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}