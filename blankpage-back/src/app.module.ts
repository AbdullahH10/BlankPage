import { User } from './Entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService :ConfigService) => ({
        type: 'mongodb',
        host: configService.get<string>('DB_HOST_URL'),
        port: configService.get<number>('DB_HOST_PORT'),
        database: configService.get<string>('DB_NAME'),
        entities: [User],
        autoLoadEntities: true,
        useUnifiedTopology: true
      })
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
