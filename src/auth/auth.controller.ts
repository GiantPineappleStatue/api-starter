import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Render,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UnhashedNewUserDto } from '../user/dto/user.dto';
import { SubmittedEmailPasswordDto } from '../user/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  @Render('index')
  root() {}
  @Get('login-page')
  @Render('login-page')
  getLoginPage() {}

  @Get('create-user-page')
  @Render('create-user-page')
  getCreateUserPage() {}
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
  async signinUser(
    @Body() submittedEmailPassword: SubmittedEmailPasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    if (!submittedEmailPassword) {
      throw new HttpException(
        'Signin credentials missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const userToken = await this.authService.validateEmailPassword(
        submittedEmailPassword,
      );
      if (!userToken) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const callbackUrl = `http://localhost:5173/callback?code=${encodeURIComponent(userToken)}`;
      res.redirect(callbackUrl);
    } catch (error: any) {
      const errorMessage = error.message || 'Internal server error';
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(errorMessage, statusCode);
    }
  }
}
