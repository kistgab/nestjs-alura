import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() requestBody: CreateUserDTO) {
    return await this.userService.create(requestBody);
  }

  @Get()
  async listAll(): Promise<ListUserDTO[]> {
    return await this.userService.listAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() requestBody: UpdateUserDTO) {
    return await this.userService.update(id, requestBody);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
