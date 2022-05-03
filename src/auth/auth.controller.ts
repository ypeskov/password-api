import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import UserCreateDto from './Dto/user.create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('user')
  async createUser(@Body() user: UserCreateDto) {
    let result;
    try {
      result = await this.authService.createUser(user);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException('Error', 400);
      }
    }

    return result;
  }
}
