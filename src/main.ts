import { SiteGlobalsController } from './_site-globals.controller';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { PORT } from './config/constant';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const global = new SiteGlobalsController(new ConfigService(), app);

  // Enable CORS
  global.enableCORS();

  // Set API prefix
  global.setGlobalPrefix();

  // Set Pipes globally
  global.setPipes();

  await app.listen(PORT);

  logger.verbose(`listen in port http://localhost:${PORT}/`);
}
bootstrap();
