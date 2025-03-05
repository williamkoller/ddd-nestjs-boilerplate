import { User } from './user';
import { UniqueEntityId } from '../shared/unique-entity-id/unique-entity-id';
import { DomainValidationException } from '../shared/errors/domain-validation-exception';
import { UserCreatedEvent } from './events/user-created-event';

describe('User Entity', () => {
  it('should create a new user with default values and trigger UserCreatedEvent', () => {
    const user = User.create({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash: 'hashed_password',
      salt: 'random_salt',
      status: 'active',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.status).toBe('active');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);

    // Verifica se o evento de domínio foi adicionado
    const domainEvents = user.domainEvents;
    expect(domainEvents).toHaveLength(1);
    expect(domainEvents[0]).toBeInstanceOf(UserCreatedEvent);
  });

  it('should create a user without triggering UserCreatedEvent when an ID is provided', () => {
    const customId = new UniqueEntityId();
    const user = User.create(
      {
        username: 'customIDUser',
        email: 'custom@example.com',
        passwordHash: 'custom_hashed',
        salt: 'custom_salt',
        status: 'active',
      },
      customId,
    );

    expect(user.id).toEqual(customId);

    expect(user.domainEvents).toHaveLength(0);
  });

  it('should throw a DomainValidationException when required properties are missing', () => {
    expect(() =>
      User.create({
        username: '',
        email: '',
        passwordHash: '',
        salt: '',
        status: 'active',
      }),
    ).toThrow(DomainValidationException);
  });

  it('should update user status correctly', () => {
    const user = User.create({
      username: 'statusUser',
      email: 'status@example.com',
      passwordHash: 'status_hashed',
      salt: 'status_salt',
      status: 'pending',
    });

    expect(user.status).toBe('pending');

    user.updateStatus('active');

    expect(user.status).toBe('active');
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should ensure twoFactorEnabled defaults to false if not provided', () => {
    const user = User.create({
      username: 'securityUser',
      email: 'security@example.com',
      passwordHash: 'security_hashed',
      salt: 'security_salt',
      status: 'active',
    });

    expect(user.props.twoFactorEnabled).toBe(false);
  });
});
