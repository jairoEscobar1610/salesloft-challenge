import { DatabaseType } from 'typeorm';
import { HttpModule, Module } from '@nestjs/common';
import { SalesloftPeopleService } from './people/people.service';
import { SalesloftConfigModule, SalesloftConfigService } from 'config/vendors/salesloft';
@Module({
  imports: [SalesloftConfigModule,
    HttpModule.registerAsync({
    imports:[SalesloftConfigModule],
    useFactory: async (salesloftConfigService: SalesloftConfigService) => ({
      headers: {'authorization':`Bearer ${salesloftConfigService.apiKey}`}
    }),
    inject:[SalesloftConfigService]
    
  })],
  providers: [SalesloftPeopleService],
  exports: [SalesloftPeopleService]
})
export class SalesloftProviderModule {}
