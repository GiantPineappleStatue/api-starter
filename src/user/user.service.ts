import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  GetUserDto,
  HashedNewUserDto,
  UpdateUserProfile,
} from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async findUserByEmail(email: string): Promise<GetUserDto | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const users = await this.databaseService.selectRows<GetUserDto[]>(query, [
      email,
    ]);

    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }

  async createUserWithPassword(hashedNewUserDto: HashedNewUserDto) {
    const query =
      'INSERT INTO users (email, email_verified, hashed_password) VALUES (?, ?, ?)';
    try {
      const { affectedRows } =
        await this.databaseService.insertUpdateDeleteBool(query, [
          hashedNewUserDto.email,
          hashedNewUserDto.email_verified,
          hashedNewUserDto.hashed_password,
        ]);
      return affectedRows === 1;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(updateUserProfile: UpdateUserProfile) {
    const query =
      'UPDATE users SET email = ?, family_name = ?, given_name = ?, picture = ? WHERE email = ?';

    try {
      const { affectedRows } =
        await this.databaseService.insertUpdateDeleteBool(query, [
          updateUserProfile.email,
          updateUserProfile.family_name,
          updateUserProfile.given_name,
          updateUserProfile.picture,
          updateUserProfile.email,
        ]);

      return affectedRows === 1;
    } catch (err) {
      throw err;
    }
  }

  // updateUser(email: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a user`;
  // }
}
