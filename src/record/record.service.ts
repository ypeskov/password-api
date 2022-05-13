import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { User } from 'src/auth/auth.service';
import { AddFolderDto } from './Dto/folder.add.dto';

import { RecordDto } from './Dto/record.add.dto';
import { Folder, RecordType, SecureRecord } from './types';

const RECORD_TABLE_NAME = 'secure_records';
const RECORD_TYPES_TABLE_NAME = 'record_types';
const FOLDER_TABLE_NAME = 'folders';

const RECORD_TYPES = [
  'login',
  'card',
  'note'
]

@Injectable()
export class RecordService {
  constructor(@InjectKnex() private db: Knex) { }

  async addRecord(record: RecordDto, user): Promise<SecureRecord> {
    const { type, name } = record;

    if (!RECORD_TYPES.includes(type)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    
    const foundType: RecordType = await this
      .db<RecordType>(RECORD_TYPES_TABLE_NAME)
      .where('type', type)
      .first();
    if (!foundType) {
      throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const date = new Date();

    const res = await 
      this.db(RECORD_TABLE_NAME)
      .returning('*')
      .insert<SecureRecord[]>({
        name,
        user_id: user.id,
        record_type_id: foundType.id,
        created_at: date,
        updated_at: date
      });

    if (res.length !== 1) {
      throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return res[0];
  }

  async addFolder(name: AddFolderDto, user: User): Promise<Folder> {
    const now = new Date();
    
    const res = await 
      this.db(FOLDER_TABLE_NAME)
      .returning('*')
      .insert<Folder[]>({
        name,
        user_id: user.id,
        created_at: now,
        updated_at: now
      });

      if (res.length !== 1) {
        throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return res[0];
  }
}
