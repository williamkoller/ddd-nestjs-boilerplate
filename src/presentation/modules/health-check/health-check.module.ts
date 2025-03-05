import { Module } from '@nestjs/common';
import { HealthCheckController } from '@app/presentation/controllers/health-check/health-check.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
