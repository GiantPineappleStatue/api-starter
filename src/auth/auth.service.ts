import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HashedNewUserDto, UnhashedNewUserDto } from '../user/dto/user.dto';
import { SubmittedEmailPasswordDto } from '../user/dto/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async createUser({
    email,
    plaintext_password,
  }: UnhashedNewUserDto): Promise<string | null> {
    const saltOrRounds = 10;
    const hashed_password = await bcrypt.hash(plaintext_password, saltOrRounds);
    const hashedNewUserDto: HashedNewUserDto = {
      email,
      email_verified: false,
      hashed_password,
    };
    const userCreated =
      await this.usersService.createUserWithPassword(hashedNewUserDto);
    if (userCreated) {
      // this.logger.log('User Created ');
      const newUser = await this.usersService.findUserByEmail(email);
      if (newUser) {
        return this.createJwt(newUser.email, newUser.id);
      }
    }
    return null;
  }

  async validateEmailPassword(
    submittedEmailPassword: SubmittedEmailPasswordDto,
  ): Promise<string | null> {
    const storedUser = await this.usersService.findUserByEmail(
      submittedEmailPassword.email,
    );
    if (storedUser) {
      const isMatch = await bcrypt.compare(
        submittedEmailPassword.plaintext_password,
        storedUser.hashed_password,
      );
      if (isMatch) {
        return this.createJwt(storedUser.email, storedUser.id);
      }
    }
    return null;
  }

  async createJwt(email: string, sub: number): Promise<string> {
    return await this.jwtService.signAsync({ email, sub });
  }
}
