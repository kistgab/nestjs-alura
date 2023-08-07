import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByIdElseThrow(id: string): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!foundUser) {
      throw new Error('Usuário com este ID não encontrado!');
    }
    return foundUser;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const isEmailAlreadyUsed = await this.userRepository.exist({
      where: { email },
    });
    return isEmailAlreadyUsed;
  }

  async listAll() {
    const allUsers = await this.userRepository.find();
    const usersDtoList = allUsers.map(
      (user) => new ListUserDTO(user.id, user.name),
    );
    return usersDtoList;
  }

  async create(request: CreateUserDTO) {
    const user = new UserEntity();
    user.email = request.email;
    user.password = request.password;
    user.name = request.name;
    await this.userRepository.save(user);
    return new ListUserDTO(user.id, user.name);
  }

  async update(id: string, newUser: UpdateUserDTO) {
    const user = await this.findByIdElseThrow(id);
    Object.entries(newUser).forEach(([propertyName, propertyValue]) => {
      if (propertyName === 'id') {
        return;
      }
      if (user[propertyName]) {
        user[propertyName] = propertyValue;
      }
    });
    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    const deletedUser = await this.findByIdElseThrow(id);
    await this.userRepository.delete(id);
    return deletedUser;
  }
}
