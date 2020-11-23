import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service that manages third-party Salesloft config-based operations
 * 
 * @class
 */
@Injectable()
export class SalesloftConfigService {
  constructor(private configService: ConfigService) {}

  get(key: string): string {
    return this.configService.get<string>(`salesloft.${key}`);
  }

  get apiKey(): string {
    return this.configService.get<string>(`salesloft.apiKey`);
  }

  get apiUrl(): string {
    return this.configService.get<string>(`salesloft.apiUrl`);
  }

}
