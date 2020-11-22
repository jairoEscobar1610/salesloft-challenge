import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '../../config/app';
import { MysqlConfigModule } from 'config/database/mysql';
import { SalesloftConfigModule } from 'config/vendors/salesloft';

@Module({
  imports: [
    AppConfigModule, 
    MysqlConfigModule, 
    SalesloftConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
