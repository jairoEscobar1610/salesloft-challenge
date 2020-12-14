import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
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
  // HTTP Headers attack protection
  app.use(helmet());
  // API Request - limit calls
  app.use(
    rateLimit({
      windowMs: (appConfig.requestLimitWindow || 15 * 60) * 1000,
      max: (appConfig.requestLimit || 100), // limit each IP to 100 requests per windowMs
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      /*
            If set to true, instead of stripping non-whitelisted
            properties validator will throw an exception.
      */
      forbidNonWhitelisted: true,
      /*
            If set to true, validator will strip validated (returned)
            object of any properties that do not use any validation decorators.
      */
      whitelist: true,
    }),
  );
  await app.listen(appConfig.port);
}
bootstrap();
