import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

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
    user.id = uuid();
    await this.userRepository.save(user);
    return {
      user: new ListUserDTO(user.id, user.name),
      message: 'Usuário criado com sucesso!',
    };
  }

  async update(id: string, newUser: UpdateUserDTO) {
    const user = await this.userRepository.findOne({ where: { id } });
    Object.entries(newUser).forEach(([propertyName, propertyValue]) => {
      if (propertyName === 'id') {
        return;
      }
      if (user[propertyName]) {
        user[propertyName] = propertyValue;
      }
    });
    await this.userRepository.update(id, user);
    return {
      user: user,
      message: 'Usuário atualizado com sucesso!',
    };
  }

  async delete(id: string) {
    const deletedUser = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.delete(id);

    return {
      user: deletedUser,
      message: 'Usuário removido com sucesso!',
    };
  }

  async existsByEmail(email: string): Promise<boolean> {
    const isEmailAlreadyUsed = await this.userRepository.exist({
      where: { email },
    });
    return isEmailAlreadyUsed;
  }
}
