import { PartialType } from '@nestjs/mapped-types';
import { UnhashedNewUserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UnhashedNewUserDto) {}
