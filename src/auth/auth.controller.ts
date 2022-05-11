import { Body, Controller, Get, HttpException, Request, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

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
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
