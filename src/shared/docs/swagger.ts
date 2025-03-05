import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';
import { ConfigurationImplementation } from '../config/configuration';

const swaggerPath = '/api/swagger';

export class Swagger {
  public static setup(
    app: NestExpressApplication,
    configuration: ConfigurationImplementation,
  ): void {
    const swaggerPassword = configuration.swaggerPass;
    const swaggerUsername = configuration.swaggerUser;

    app.use(
      [swaggerPath, `${swaggerPath}-json`],
      basicAuth({
        challenge: true,
        users: { [swaggerUsername]: swaggerPassword },
      }),
    );
    const document = new DocumentBuilder()
      .setTitle('Pantone Challenge API')
      .setDescription('Pantone Challenge API description')
      .setVersion('0.0.1')
      .build();

    const createDocument = SwaggerModule.createDocument(app, document);
    SwaggerModule.setup(swaggerPath, app, createDocument);
  }
}
