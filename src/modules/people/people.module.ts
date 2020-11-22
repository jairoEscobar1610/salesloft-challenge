import { Module } from '@nestjs/common';
import { SalesloftPeopleService } from 'providers/vendors/salesloft/people/people.service';
import { SalesloftProviderModule } from 'providers/vendors/salesloft/salesloft.module';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  imports:[SalesloftProviderModule],
  controllers: [PeopleController],
  exports: [PeopleService],
  providers: [PeopleService],
})
export class PeopleModule {}
