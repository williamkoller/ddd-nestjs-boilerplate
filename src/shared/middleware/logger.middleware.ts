import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.cli(),
      transports: [new winston.transports.Console()],
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const originalSend = res.send;

    res.send = (body: any): Response<any> => {
      const duration = Date.now() - startTime;

      let responseBody = {};
      if (body) {
        try {
          responseBody = this.filterSensitiveData(JSON.parse(body));
        } catch (e) {
          responseBody = body;
        }
      }

      const log = {
        method: req.method,
        path: req.path,
        query: req.query,
        body: this.filterSensitiveData(req.body),
        responseBody,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        responseTime: `${duration}ms`,
      };

      if (res.statusCode >= 400) {
        this.logger.error(JSON.stringify(log));
      } else {
        this.logger.info(JSON.stringify(log));
      }

      return originalSend.call(res, body);
    };

    next();
  }

  private filterSensitiveData(data: any): any {
    const sensitiveFields = [
      'password',
      'currentPassword',
      'newPassword',
      'confirmPassword',
    ];
    const filteredData = { ...data };

    for (const field of sensitiveFields) {
      if (filteredData[field]) {
        filteredData[field] = '***';
      }
    }

    return filteredData;
  }
}
