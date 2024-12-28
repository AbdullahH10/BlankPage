import { UserDTO } from './DTO/user.dto';
import { Body, Controller, Get, Headers, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from './DTO/response.dto';
import { Token } from './DTO/token.dto';
import { MessageDTO } from './DTO/message.dto';
import { Message } from './Model/message.model';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/user/create')
  @HttpCode(200)
  async createUser(@Body() user: UserDTO): Promise<ResponseDTO> {
    const isUserCreated = await this.appService.createUser(user);
    if (isUserCreated) {
      return new ResponseDTO(
        'User created successfully',
        null
      );
    }
    else {
      return new ResponseDTO(
        'Could not create user. Please try again with a different user name.',
        null
      );
    }
  }

  @Post('/user/login')
  @HttpCode(200)
  async loginUser(@Body() user: UserDTO): Promise<ResponseDTO> {
    const isAuthenticated: boolean = await this.appService.authenticateUser(user);
    if (isAuthenticated) {
      const token: Token = await this.appService.getToken(user);
      if (token !== null && token !== undefined) {
        return new ResponseDTO(
          'User logged in successfully.',
          token
        );
      }
      else {
        return new ResponseDTO(
          'User authenticated but could not generate token.',
          token
        );
      }
    }
    else {
      return new ResponseDTO(
        'Login failed. Incorrect user name or password.',
        null
      );
    }
  }

  @Post('/message/post/:userId')
  @HttpCode(200)
  async postMessage(
    @Param('userId') userId: string,
    @Body() message: MessageDTO
  ): Promise<ResponseDTO> {
    const isPosted: boolean = await this.appService.addMessage(userId, message);
    if (isPosted) {
      return new ResponseDTO(
        'Message sent.',
        null
      );
    }
    return new ResponseDTO(
      'Failed to send message. Please try again.',
      null
    );
  }

  @Get('/message/get/:userId')
  @HttpCode(200)
  async getMessages(
    @Param('userId') userId: string,
    @Headers('token') token: string): Promise<ResponseDTO> {
    const tokenObj: Token = new Token();
    tokenObj.userId = userId;
    tokenObj.token = token;
    if(token === undefined){
      return new ResponseDTO(
        'Authentication failure. Token is required.',
        null
      );
    }
    const messages: Message[] = await this.appService.getMessages(tokenObj);
    if (messages !== null && messages !== undefined) {
      return new ResponseDTO(
        messages.length + ' messages found',
        messages
      );
    }
    else if (messages === undefined) {
      return new ResponseDTO(
        'No messages found',
        null
      );
    }
    return new ResponseDTO(
      'Failed to get all messages. Token invalid or database not responding.',
      null
    );
  }
}
