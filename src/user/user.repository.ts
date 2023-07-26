import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async listAll() {
    return this.users;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const isEmailAlreadyUsed = this.users.some((user) => user.email === email);
    return isEmailAlreadyUsed;
  }
}
