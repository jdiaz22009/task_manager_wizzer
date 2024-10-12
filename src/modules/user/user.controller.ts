import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../aplication/dto/create-user.dto';
import { LoginUserDto } from '../../aplication/dto/login-user-dto';

type CreateUserWithoutPassword = Omit<User, 'password'>;

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createTask(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserWithoutPassword> {
    const { password, ...user } =
      await this.userService.createUser(createUserDto);
    return user;
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.userService.login(loginUserDto);
  }
}
