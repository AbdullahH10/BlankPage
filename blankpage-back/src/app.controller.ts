import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './Entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getAll(): Promise<any> {
    return this.appService.getAll();
  }

  @Post('/setUser')
  async setUser(@Body() userData): Promise<any> {
    return this.appService.setUser(userData);
  }

  @Post('/getUser')
  async getUser(@Body() userData): Promise<any> {
    return this.appService.getUser(userData);
  }

  @Post('/getMessages/')
  async getMessages(@Body() userData): Promise<any> {
    return this.appService.getMessages(userData);
  }

  @Post('/sendMessage/:id')
  async sendMessage(@Param() params, @Body() userData): Promise<void> {
    return this.appService.sendMessage(params.id,userData);
  }
}
