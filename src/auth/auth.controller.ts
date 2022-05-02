import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import UserCreateDto from './Dto/user.create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  createUser(@Body() user: UserCreateDto) {
    this.authService.createUser(user)
    return 123;
  }
}
