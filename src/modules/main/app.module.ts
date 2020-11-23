import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '../../config/app';
import { MysqlConfigModule } from 'config/database/mysql';
import { SalesloftConfigModule } from 'config/vendors/salesloft';
import { PeopleModule } from 'modules/people';

@Module({
  imports: [
    AppConfigModule, 
    MysqlConfigModule, 
    SalesloftConfigModule,
    PeopleModule,
    CacheModule.register()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
