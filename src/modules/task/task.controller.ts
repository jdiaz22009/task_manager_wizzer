import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { Task } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../../aplication/dto/create-task.dto';
import { User } from '../../domain/entities/user.entity';
import { UpdateTaskDto } from '../../aplication/dto/update-task.dto';
import { AuthGuard } from '../../config/jwt-auth-guard';
import { GetUser } from '../../infrastructure/decorators/get-user.decorator';

type CreateTaskWithoutUser = Omit<Task, 'user'>;

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks(@GetUser() userTask: User): Promise<Task[]> {
    return this.taskService.getAllTasks(userTask);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() userTask: User,
  ): Promise<CreateTaskWithoutUser> {
    const { user, ...taks } = await this.taskService.createTask(
      createTaskDto,
      userTask,
    );
    return taks;
  }

  @Patch('/update_task/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete('/delete_task/:id')
  deleteTaskStatus(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTask(id);
  }
}
