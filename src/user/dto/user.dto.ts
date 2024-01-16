export class UnhashedNewUserDto {
  email!: string;
  plaintext_password!: string;
}

export class HashedNewUserDto {
  email!: string;
  email_verified!: boolean;
  hashed_password!: string;
}

export class GoogleAuthUserDto {
  email!: string;
  email_verified!: boolean;
  given_name!: string;
  family_name!: string;
  picture!: string;
  sub!: string;
}

export class GetUserDto {
  created_at!: string;
  email!: string;
  email_verified!: number;
  family_name!: string;
  given_name!: string;
  id!: number;
  picture!: string;
  provider_id!: number;
  updated_at!: string;
  hashed_password!: string;
}

export class GetUserProfileDto {
  created_at!: string;
  email!: string;
  email_verified!: number;
  family_name!: string;
  given_name!: string;
  id!: number;
  picture!: string;
  provider_id!: number;
  updated_at!: string;
}

export interface UpdateUserProfile {
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}
