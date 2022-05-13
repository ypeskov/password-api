import { IsNumber, IsOptional, IsString } from "class-validator";

export class RecordDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  @IsOptional()
  folder_id?: number;
}