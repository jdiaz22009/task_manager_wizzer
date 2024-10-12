import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';
import { method, whitelist } from './config/constant';

export class SiteGlobalsController {
  constructor(
    private readonly configService: ConfigService,
    private readonly app: any,
  ) {}

  /**
   * list of pipes to be applied globally
   */

  setPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        dismissDefaultMessages: true,
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return validationErrors;
        },
      }),
    );
  }

  /**
   * Sets API prefix at global level (all APIs)
   * Example: /api/V1/
   * 'v1' - API version to be set in .env
   */

  setGlobalPrefix() {
    this.app.setGlobalPrefix('/api');
  }

  /**
   * Enables CORS
   */
  enableCORS() {
    this.app.enableCors({
      origin: whitelist,
      methods: method,
      credentials: true,
    });
  }
}
