import { UserDTO } from './DTO/user.dto';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDTO } from './DTO/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user/create')
  @HttpCode(200)
  createUser(@Body() user: UserDTO){
    return this.appService.createUser(user).then(
      (isUserCreated) => {
        if(isUserCreated){
          return new ResponseDTO(
            'User created successfully',
            null
          );
        }
        else{
          return new ResponseDTO(
            'Could not create user.',
            null
          );
        }
      }
    )
  }
  
  // @Get('/user/get')
  // getAllUsers(): Promise<any> {
  // }

  // @Get('/user/get/:userId')
  // getUser(@Param('userId') userId: number): Promise<any> {
  // }

  // @Post('/message/post/:userId')
  // postMessage(@Param('userId') userId: number,@Body() data): Promise<void> {
  // }

  // @Get('/message/get/:userId')
  // getMessages(@Param('userId') userId: number): Promise<any> {
  // }
}
