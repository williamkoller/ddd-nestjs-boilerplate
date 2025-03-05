import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/shared/config/configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeTransactionalModule } from 'sequelize-transactional-decorator';
import { MetadataScanner } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRoot(configuration().database),
    SequelizeTransactionalModule.register(),
  ],
  providers: [MetadataScanner],
})
export class GlobalModule {}
