import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

@Module({
  controllers: [PeopleController],
  exports: [PeopleService],
  providers: [PeopleService],
})
export class PeopleModule {}
