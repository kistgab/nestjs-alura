import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async save(user: UserEntity) {
    this.users.push(user);
  }

  async listAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async update(
    id: string,
    dataToUpdate: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.findById(id);

    Object.entries(dataToUpdate).forEach(([propertyName, propertyValue]) => {
      if (propertyName === 'id') {
        return;
      }
      user[propertyName] = propertyValue;
    });

    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    const foundUser = await this.findById(id);
    this.users = this.users.filter((user) => user.id !== foundUser.id);
    return foundUser;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const isEmailAlreadyUsed = this.users.some((user) => user.email === email);
    return isEmailAlreadyUsed;
  }

  private async findById(id: string): Promise<UserEntity> {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) {
      throw new Error('Usuário não existe');
    }
    return foundUser;
  }
}
