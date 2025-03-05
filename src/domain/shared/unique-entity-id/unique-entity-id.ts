import { randomUUID } from 'node:crypto';
import { Identifier } from '../identifier/identifier';

export class UniqueEntityId extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : randomUUID());
  }
}
