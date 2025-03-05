import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import fs from 'node:fs';

export interface Configuration {
  port: number;
  swaggerUser: string;
  swaggerPass: string;
  database: SequelizeModule;
}

// Export for load ConfigModule
export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10),
  swaggerUser: process.env.SWAGGER_USER,
  swaggerPass: process.env.SWAGGER_PASS,
  database: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadModels: true,
    logging: process.env.DATABASE_LOGGING === 'true' || false,
    synchronize: false,
    models: [],
    minifyAliases: true,
    dialectOptions: {
      decimalNumbers: true,
      ...(process.env.DATABASE_CA
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: true,
              ca: fs.readFileSync(process.env.DATABASE_CA as string).toString(),
            },
          }
        : false),
    },
  },
});

export class ConfigurationImplementation {
  constructor(private readonly config: ConfigService) {}

  get port(): number {
    return this.config.get<number>('PORT');
  }

  get swaggerUser(): string {
    return this.config.get<string>('SWAGGER_USER');
  }

  get swaggerPass(): string {
    return this.config.get<string>('SWAGGER_PASS');
  }
}
