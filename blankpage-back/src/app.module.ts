import { User } from './entities/User';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationService } from './services/registration/registration.service';
import { Message } from './entities/Message';
import { UserController } from './controller/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'blankpage',
      entities: [User,Message]
    }),
    TypeOrmModule.forFeature([User,Message]),
  ],
  controllers: [
    UserController
  ],
  providers: [
    RegistrationService
  ]
})
export class AppModule {}
