import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';
import { AppConfigService } from 'config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigService = app.get('AppConfigService');
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  console.log(appConfig.port);
  await app.listen(appConfig.port);
}
bootstrap();
