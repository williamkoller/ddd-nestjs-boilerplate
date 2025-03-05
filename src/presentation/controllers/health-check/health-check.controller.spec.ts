import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe(HealthCheckController.name, () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    healthCheckController = module.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  it('should return health check message', () => {
    const result = healthCheckController.healthCheck();
    expect(result).toEqual({ message: 'Health check is OK!' });
  });
});
