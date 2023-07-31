import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() requestBody: CreateUserDTO) {
    const user = new UserEntity();
    user.email = requestBody.email;
    user.password = requestBody.password;
    user.name = requestBody.name;
    user.id = uuid();

    await this.userRepository.save(user);
    return {
      user: new ListUserDTO(user.id, user.name),
      message: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listAll(): Promise<ListUserDTO[]> {
    return this.userService.listAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() requestBody: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, requestBody);

    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userRepository.delete(id);
    return {
      user: deletedUser,
      message: 'Usuário removido com sucesso!',
    };
  }
}
