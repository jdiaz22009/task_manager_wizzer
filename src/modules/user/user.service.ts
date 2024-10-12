import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../aplication/dto/create-user.dto';
import { LoginUserDto } from '../../aplication/dto/login-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    throw new NotFoundException();
  }

  async getUserByid(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const validuser = await this.validateUser(user.username, user.password);

    if (validuser === null) return;

    const payload = { username: validuser.username, sub: validuser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(createTaskDto: CreateUserDto): Promise<User> {
    const encriptedPassword = await bcrypt.hash(createTaskDto.password, 10);
    return this.userRepository.save({
      ...createTaskDto,
      password: encriptedPassword,
    });
  }
}
