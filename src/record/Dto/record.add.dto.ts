import { IsString } from "class-validator";

export class RecordDto {
  @IsString()
  name: string;

  @IsString()
  type: string;
}