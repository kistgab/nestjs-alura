import { Body, Controller, Get, Post } from '@nestjs/common';
import { get, request } from 'http';
import { UserRepository } from '../repository/user.repository';

@Controller('/users')
export class UserController {
  private userRepository = new UserRepository();

  @Post()
  async create(@Body() requestBody) {
    await this.userRepository.save(requestBody);
    return requestBody;
  }

  @Get()
  async listAll(): Promise<any[]> {
    return await this.userRepository.listAll();
  }
}
