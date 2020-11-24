import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service that manages app mysql-based operations
 * @class
 */
@Injectable()
export class MysqlConfigService {
  constructor(private configService: ConfigService) {}

  get(key: string): string {
    return this.configService.get<string>(`mysql.${key}`);
  }

  get dbType(): string {
    return this.configService.get<string>(`mysql.dbType`);
  }

  get username(): string {
    return this.configService.get<string>(`mysql.username`);
  }

  get password(): string {
    return this.configService.get<string>(`mysql.password`);
  }

  get host(): string {
    return this.configService.get<string>(`mysql.host`);
  }

  get port(): number {
    return Number(this.configService.get<number>(`mysql.port`));
  }

  get database(): string {
    return this.configService.get<string>(`mysql.database`);
  }

}
