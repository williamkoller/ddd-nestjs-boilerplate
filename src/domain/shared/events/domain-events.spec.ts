import { DomainEvents } from './domain-events';
import { AggregateRoot } from '../aggregate-root/aggregate-root';
import { UniqueEntityId } from '../unique-entity-id/unique-entity-id';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IDomainEvent } from './idomain-events';

jest.mock('@nestjs/event-emitter', () => ({
  EventEmitter2: jest.fn().mockImplementation(() => ({
    emit: jest.fn(),
  })),
}));

class MockAggregate extends AggregateRoot<any> {
  constructor(id?: UniqueEntityId) {
    super({} as any, id);
  }

  public addDomainEvent(event: IDomainEvent): void {
    this.domainEvents.push(event);
  }
}

class MockEvent implements IDomainEvent {
  constructor(public payload: any) {}
  dateTimeOccurred: Date = new Date();

  getAggregateId(): UniqueEntityId {
    return new UniqueEntityId();
  }
}

describe('DomainEvents', () => {
  let eventEmitter: EventEmitter2;
  let domainEvents: DomainEvents;

  beforeEach(() => {
    eventEmitter = new EventEmitter2();
    domainEvents = new DomainEvents(eventEmitter);
    DomainEvents.clearAggregates();
  });

  it('should register an aggregate for dispatch', () => {
    const aggregate = new MockAggregate(new UniqueEntityId());
    DomainEvents.markAggregateForDispatch(aggregate);

    const aggregates = DomainEvents.getModifiedAggregates();
    expect(aggregates).toHaveLength(1);
    expect(aggregates[0]).toBe(aggregate);
  });

  it('should dispatch events for aggregate', () => {
    const aggregate = new MockAggregate(new UniqueEntityId());
    const event = new MockEvent({ message: 'Test Event' });
    aggregate.addDomainEvent(event);
    DomainEvents.markAggregateForDispatch(aggregate);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(eventEmitter.emit).toHaveBeenCalledWith('MockEvent', event);
  });

  it('should not dispatch events for an aggregate with no events', () => {
    const aggregate = new MockAggregate(new UniqueEntityId());
    DomainEvents.markAggregateForDispatch(aggregate);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should clear all aggregates', () => {
    const aggregate = new MockAggregate(new UniqueEntityId());
    DomainEvents.markAggregateForDispatch(aggregate);

    expect(DomainEvents.getModifiedAggregates()).toHaveLength(1);

    DomainEvents.clearAggregates();
    expect(DomainEvents.getModifiedAggregates()).toHaveLength(0);
  });

  it('should dispatch multiple events for an aggregate', () => {
    const aggregate = new MockAggregate(new UniqueEntityId());
    const event1 = new MockEvent({ message: 'Event 1' });
    const event2 = new MockEvent({ message: 'Event 2' });

    aggregate.addDomainEvent(event1);
    aggregate.addDomainEvent(event2);

    DomainEvents.markAggregateForDispatch(aggregate);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(eventEmitter.emit).toHaveBeenCalledWith('MockEvent', event1);
    expect(eventEmitter.emit).toHaveBeenCalledWith('MockEvent', event2);
  });
});
