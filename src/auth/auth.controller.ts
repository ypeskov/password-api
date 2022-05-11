import { Body, Controller, Get, HttpException, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService, User } from './auth.service';
import UserCreateDto from './Dto/user.create.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('user')
  async createUser(@Body() user: UserCreateDto) {
    let result: User;
    try {
      result = await this.authService.createUser(user);

      return result;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException('Error', 500);
      }
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
