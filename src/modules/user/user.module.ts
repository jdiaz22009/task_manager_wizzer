import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { User } from '../../domain/entities/user.entity';
import { UserService } from './user.service';
import { EXPIRES_IN, SECRET_JWT } from '../../config/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: SECRET_JWT,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
