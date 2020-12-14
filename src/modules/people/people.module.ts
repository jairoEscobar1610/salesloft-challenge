import { CacheModule, Module } from '@nestjs/common';
import { AppConfigModule } from 'config/app';
import { SalesloftConfigModule } from 'config/vendors/salesloft';
import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports:[SalesloftProviderModule,SalesloftConfigModule, AppConfigModule, CacheModule.register()],
  controllers: [PeopleController],
  exports: [PeopleService],
  providers: [PeopleService],
})
export class PeopleModule {}
