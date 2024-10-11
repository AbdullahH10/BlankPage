import { UserDto } from 'src/dtos/UserDto';
import { ResponseDto } from 'src/dtos/ResponseDto';
import { RegistrationService } from './../../services/registration/registration.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/user')
export class UserController {
    constructor(
        private readonly registrationService: RegistrationService
    ){}

    //todo
}
