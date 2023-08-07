import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() requestBody: CreateUserDTO) {
    const createdUser = await this.userService.create(requestBody);
    return {
      user: createdUser,
      message: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listAll(): Promise<ListUserDTO[]> {
    const allUsers = await this.userService.listAll();
    return allUsers;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() requestBody: UpdateUserDTO) {
    const updatedUser = await this.userService.update(id, requestBody);
    return {
      user: updatedUser,
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);
    return {
      user: deletedUser,
      message: 'Usuário removido com sucesso!',
    };
  }
}
