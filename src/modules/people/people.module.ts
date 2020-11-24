import { CacheModule, Module } from '@nestjs/common';
import { SalesloftConfigModule } from 'config/vendors/salesloft';
import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports:[SalesloftProviderModule,SalesloftConfigModule, CacheModule.register()],
  controllers: [PeopleController],
  exports: [PeopleService],
  providers: [PeopleService],
})
export class PeopleModule {}
