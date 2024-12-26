import { UserDTO } from './DTO/user.dto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from './DTO/response.dto';
import { Token } from './DTO/token.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user/create')
  @HttpCode(200)
  async createUser(@Body() user: UserDTO): Promise<ResponseDTO>{
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
  async loginUser(@Body() user: UserDTO): Promise<ResponseDTO>{
    const isAuthenticated: boolean = await this.appService.authenticateUser(user);
    if (isAuthenticated) {
      const token: Token = await this.appService.getToken(user);
      if(token !== null){
        return new ResponseDTO(
          'User logged in successfully.',
          token
        );
      }
      else{
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

  // @Post('/message/post/:userId')
  // postMessage(@Param('userId') userId: number,@Body() data): Promise<void> {
  // }

  // @Get('/message/get/:userId')
  // getMessages(@Param('userId') userId: number): Promise<any> {
  // }
}
