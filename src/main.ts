import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationImplementation } from '@app/shared/config/configuration';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Swagger } from './shared/docs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpAllExceptionsFilter } from './shared/http/filters/http-all-exceptions.filter';
import { Response } from 'express';
import { initSequelizeCLS } from 'sequelize-transactional-decorator';
import { umzug } from '../migrations/umzugClient';
import { EventsDispatcherInterceptor } from './shared/http/interceptors/events-dispatcher.interceptor';

async function bootstrap() {
  initSequelizeCLS();
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpAllExceptionsFilter());
  app.useGlobalInterceptors(new EventsDispatcherInterceptor());

  app.getHttpAdapter().get('/', (_, res: Response) => {
    res.redirect('/api/health-check');
  });

  const config = new ConfigurationImplementation(new ConfigService());
  const port = config.port;

  Swagger.setup(app, config);

  await umzug.up();

  await app.listen(port, () => logger.log(`Server is running on port ${port}`));
}
bootstrap();
