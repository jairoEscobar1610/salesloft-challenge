import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'config/app';

@Injectable()
export class AppService {
  constructor(private config: AppConfigService) {}

  root(): string {
    return this.config.url;
  }
}
