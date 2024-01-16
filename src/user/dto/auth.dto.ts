export class SubmittedEmailPasswordDto {
  email!: string;
  plaintext_password!: string;
}

export interface ReqWithUser extends Request {
  user: {
    email: string;
    sub: number;
    iat: number;
    exp: number;
  };
}
