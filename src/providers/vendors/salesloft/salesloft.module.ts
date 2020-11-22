import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { SalesloftPeopleService } from './people/people.service';
@Module({
  imports: [],
  providers: [SalesloftPeopleService],
  exports: [SalesloftPeopleService]
})
export class SalesloftProviderModule {}
