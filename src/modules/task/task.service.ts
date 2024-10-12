import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { CreateTaskDto } from '../../aplication/dto/create-task.dto';
import { UpdateTaskDto } from '../../aplication/dto/update-task.dto';
import { Task } from '../../domain/entities/task.entity';
import { User } from '../../domain/entities/user.entity';
import { TaskStatus } from '../..//domain/enums/task-status.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(userTask: User): Promise<Task[]> {
    return this.taskRepository.find({
      where: { user: { id: userTask.id }, status: Not(TaskStatus.DELETED) },
    });
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.save({
      ...createTaskDto,
      status: TaskStatus.PENDING,
      user,
    });
  }

  async updateTask(id: string, updateTaskDto?: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);

    if (updateTaskDto.status) {
      task.status = updateTaskDto.status;
    }

    if (updateTaskDto.title) {
      task.title = updateTaskDto.title;
    }

    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<string> {
    try {
      await this.taskRepository.update(id, { status: TaskStatus.DELETED });
      return `delete taskID: ${id}: successfull`;
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }
}
