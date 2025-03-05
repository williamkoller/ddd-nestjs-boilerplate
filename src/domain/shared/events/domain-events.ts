import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AggregateRoot } from '../aggregate-root/aggregate-root';
import { UniqueEntityId } from '../unique-entity-id/unique-entity-id';
import { IDomainEvent } from './idomain-events';

@Injectable()
export class DomainEvents {
  private static instance: DomainEvents | null = null;
  private static aggregates: Map<string, AggregateRoot<any>> = new Map();
  private eventEmitter: EventEmitter2;

  constructor(eventEmitter: EventEmitter2) {
    this.eventEmitter = eventEmitter;
    DomainEvents.instance = this;
  }

  public static dispatchEventsForAggregate(id: UniqueEntityId): void {
    const aggregate = DomainEvents.aggregates.get(id.toString());
    if (aggregate && DomainEvents.instance) {
      const events = aggregate.domainEvents;

      events.forEach(DomainEvents.emitEvent);
    }
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    DomainEvents.aggregates.set(aggregate.id.toString(), aggregate);
  }

  private static emitEvent(event: IDomainEvent) {
    DomainEvents.instance!.eventEmitter.emit(event.constructor.name, event);
  }

  public static clearAggregates(): void {
    DomainEvents.aggregates.clear();
  }

  public static getModifiedAggregates(): AggregateRoot<any>[] {
    return Array.from(DomainEvents.aggregates.values());
  }
}
