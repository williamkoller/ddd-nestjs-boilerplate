import { IDomainEvent } from '../../shared/events/idomain-events';
import { UniqueEntityId } from '../../shared/unique-entity-id/unique-entity-id';
import { User } from '../user';

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityId {
    return this.user.id;
  }
}
