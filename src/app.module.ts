import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './modules/task/task.module';

import { AppDataSource } from './data-source';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...AppDataSource.options,
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const host = configService.get<string>('DB_HOST');
    //     const port = configService.get<number>('DB_PORT');
    //     const username = configService.get<string>('DB_USERNAME');
    //     const password = configService.get<string>('DB_PASSWORD');
    //     const database = configService.get<string>('DB_DATABASE');

    //     console.log('Database Config:');
    //     console.log(`DB_HOST: ${host}`);
    //     console.log(`DB_PORT: ${port}`);
    //     console.log(`DB_USERNAME: ${username}`);
    //     console.log(`DB_PASSWORD: ${password}`);
    //     console.log(`DB_DATABASE: ${database}`);

    //     return {
    //       type: 'postgres',
    //       host,
    //       port,
    //       username,
    //       password,
    //       database,
    //       entities: [Task, User],
    //       migrations: [__dirname + '/../migrations/*.{js,ts}'],
    //       autoLoadEntities: true,
    //       synchronize: false,
    //     };
    //   },
    // }),
    TaskModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
