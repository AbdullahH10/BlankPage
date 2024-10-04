import { User } from './entities/User';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationService } from './services/registration/registration.service';
import { Message } from './entities/Message';

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
  controllers: [AppController],
  providers: [AppService, RegistrationService],
})
export class AppModule {}
