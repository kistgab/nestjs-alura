import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('/users')
export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

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
