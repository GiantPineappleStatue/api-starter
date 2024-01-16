import {
  Controller,
  Get,
  Body,
  UseGuards,
  Request,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProfile } from './dto/user.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { ReqWithUser } from './dto/auth.dto';
@UseGuards(JwtGuard)
@Controller('user')
//** use transformation and validation pipes _at some point_ **//
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-profile')
  async findOne(@Request() req: ReqWithUser) {
    const user = await this.userService.findUserByEmail(req.user.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashed_password, ...rest } = user;
    return rest;
  }

  @Put('update-profile')
  update(@Body() updateUserProfile: UpdateUserProfile) {
    return this.userService.updateUser(updateUserProfile);
  }
}
