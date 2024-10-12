import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Task } from './domain/entities/task.entity';
import { User } from './domain/entities/user.entity';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'postgres'),
  database: configService.get<string>('DB_DATABASE', 'task_db'),
  entities: [Task, User],
  synchronize: true,
  migrations: ['src/db/migrations/*{.ts,.js}'],
  logging: true,
});
