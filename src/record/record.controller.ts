import { Body, Controller, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { AddFolderDto } from './Dto/folder.add.dto';
import { RecordDto } from './Dto/record.add.dto';
import { RecordService } from './record.service';
import { SecureRecord } from './types';

@Controller('record')
export class RecordController {
  constructor(private recordService: RecordService) { }

  @UseGuards(JwtAuthGuard)
  @Post('new')
  async addNewRecord(@Body() body: RecordDto, @Req() req: any): Promise<SecureRecord> {
    try {
      return await this.recordService.addRecord(body, req.user);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      console.log(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('folder')
  async addNewFolder(@Body() body: AddFolderDto, @Req() req: any) {
    try {
      return this.recordService.addFolder(body, req.user);
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }
      console.log(e);
    }
  }
}
