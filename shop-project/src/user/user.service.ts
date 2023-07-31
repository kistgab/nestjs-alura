import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ListUserDTO } from './dto/listUser.dto';

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
}
