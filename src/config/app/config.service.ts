import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service that manages app config-based operations
 * 
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get(key: string): string {
    return this.configService.get<string>(`app.${key}`);
  }

  get env(): string {
    return this.configService.get<string>(`app.env`);
  }

  get url(): string {
    return this.configService.get<string>(`app.url`);
  }

  get port(): number {
    return Number(this.configService.get<number>(`app.port`));
  }

  isEnv(env: string) {
    return this.configService.get<string>(`app.env`) === env;
  }
}
