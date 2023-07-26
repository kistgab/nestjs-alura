import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async save(user) {
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
