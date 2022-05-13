import { IsString, MinLength } from "class-validator";

export class AddFolderDto {
  @IsString()
  @MinLength(1)
  name: string;
}