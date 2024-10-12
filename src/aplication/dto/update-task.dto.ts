import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/domain/enums/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
