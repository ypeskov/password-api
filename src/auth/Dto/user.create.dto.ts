import { IsString, MinLength } from "class-validator";

export default class UserCreateDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}