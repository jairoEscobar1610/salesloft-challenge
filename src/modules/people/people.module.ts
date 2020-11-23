import { CacheModule, Module } from '@nestjs/common';
import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports:[SalesloftProviderModule, CacheModule.register()],
  controllers: [PeopleController],
  exports: [PeopleService],
  providers: [PeopleService],
})
export class PeopleModule {}
