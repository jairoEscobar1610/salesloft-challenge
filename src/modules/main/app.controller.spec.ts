import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from 'config/app';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [AppConfigModule],
    }).compile();
  });

  describe('root', () => {
    it('should return "http://localhost"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.root()).toBe('http://localhost');
    });
  });
});
