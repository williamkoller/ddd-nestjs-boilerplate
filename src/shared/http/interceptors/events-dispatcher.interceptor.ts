import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { DomainEvents } from '@app/domain/shared/events/domain-events';
import { Observable, tap } from 'rxjs';

@Injectable()
export class EventsDispatcherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const aggregates = DomainEvents.getModifiedAggregates();
        aggregates.forEach((aggregate) => {
          DomainEvents.dispatchEventsForAggregate(aggregate.id);
          aggregate.clearEvents();
        });
        DomainEvents.clearAggregates();
      }),
    );
  }
}
