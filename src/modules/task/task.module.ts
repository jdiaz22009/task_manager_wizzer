import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from '../../domain/entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';
import { User } from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
