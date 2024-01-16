import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UnhashedNewUserDto } from '../user/dto/user.dto';
import { SubmittedEmailPasswordDto } from '../user/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('new-user')
  createUser(@Body() unhashedNewUser: UnhashedNewUserDto) {
    if (!unhashedNewUser) {
      console.log('invalid user');
      throw new BadRequestException('Invalid user data');
    }
    try {
      return {
        token: this.authService.createUser(unhashedNewUser),
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('signin')
  async signinUser(@Body() submittedEmailPassword: SubmittedEmailPasswordDto) {
    if (!submittedEmailPassword) {
      throw new HttpException(
        'SignIn failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    try {
      return {
        token: await this.authService.validateEmailPassword(
          submittedEmailPassword,
        ),
      };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
