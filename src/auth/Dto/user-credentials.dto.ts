import { IsEmail, IsString } from "class-validator";

export class UserCredentialsDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}