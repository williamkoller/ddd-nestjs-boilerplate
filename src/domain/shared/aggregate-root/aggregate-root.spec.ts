import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { AggregateRoot } from './aggregate-root';
import { IDomainEvent } from '../events/idomain-events';
import { UniqueEntityId } from '../unique-entity-id/unique-entity-id';
import { DomainEvents } from '../events/domain-events';

class MockDomainEvent implements IDomainEvent {
  constructor(public readonly name: string) {}
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityId {
    throw new Error('Method not implemented.');
  }
}

class ConcreteAggregateRoot extends AggregateRoot<any> {
  constructor(id?: UniqueEntityId) {
    super(id);
  }

  addDomainEvent(domainEvent: IDomainEvent): void {
    super.addDomainEvent(domainEvent);
  }
}

describe('AggregateRoot', () => {
  let aggregateRoot: ConcreteAggregateRoot;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcreteAggregateRoot,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: DomainEvents,
          useValue: {
            markAggregateForDispatch: jest.fn(),
          },
        },
      ],
    }).compile();

    aggregateRoot = module.get<ConcreteAggregateRoot>(ConcreteAggregateRoot);
  });

  it('should be defined', () => {
    expect(aggregateRoot).toBeDefined();
  });

  it('should return an empty array when no events are added', () => {
    expect(aggregateRoot.domainEvents).toEqual([]);
  });

  it('should return events when domain events are added', () => {
    const event = new MockDomainEvent('TestEvent');
    aggregateRoot.addDomainEvent(event);
    expect(aggregateRoot.domainEvents).toContain(event);
  });

  it('should add a domain event and call DomainEvents.markAggregateForDispatch', () => {
    const event = new MockDomainEvent('TestEvent');
    const markAggregateForDispatchSpy = jest.spyOn(
      DomainEvents,
      'markAggregateForDispatch',
    );
    aggregateRoot.addDomainEvent(event);
    expect(markAggregateForDispatchSpy).toHaveBeenCalledWith(aggregateRoot);
  });

  it('should log the domain event creation', () => {
    const logSpy = jest.spyOn(Logger.prototype, 'log');
    const event = new MockDomainEvent('TestEvent');
    aggregateRoot.addDomainEvent(event);
    expect(logSpy).toHaveBeenCalledWith(
      '[Domain Event Created]: ConcreteAggregateRoot ==> MockDomainEvent',
    );
  });

  it('should clear all domain events', () => {
    const event1 = new MockDomainEvent('TestEvent1');
    const event2 = new MockDomainEvent('TestEvent2');
    aggregateRoot.addDomainEvent(event1);
    aggregateRoot.addDomainEvent(event2);
    aggregateRoot.clearEvents();
    expect(aggregateRoot.domainEvents).toEqual([]);
  });

  it('should return the correct unique entity id', () => {
    const entityId = aggregateRoot.id;
    expect(entityId).toBeDefined();
    expect(entityId).toBeInstanceOf(UniqueEntityId);
  });
});
