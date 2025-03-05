import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  @ApiOperation({
    summary: 'Health Check',
  })
  @ApiOkResponse({
    description: 'Health Check',
    content: {
      'application/json': {
        example: {
          message: 'Health check is OK!',
        },
      },
    },
  })
  healthCheck() {
    return {
      message: 'Health check is OK!',
    };
  }
}
