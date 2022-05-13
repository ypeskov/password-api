import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import { RecordDto } from './Dto/record.add.dto';
import { RecordType, SecureRecord } from './types';

const RECORD_TABLE_NAME = 'secure_records';
const RECORD_TYPES_TABLE_NAME = 'record_types';

const RECORD_TYPES = [
  'login',
  'card',
  'note'
]

@Injectable()
export class RecordService {
  constructor(@InjectKnex() private db: Knex) { }

  async addRecord(record: RecordDto) {
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

    const res = await this
      .db(RECORD_TABLE_NAME)
      .returning('*')
      .insert<SecureRecord[]>({
        name,
        record_type_id: foundType.id
      });
    console.log(res);

    if (res.length !== 1) {
      throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return res[0];
  }
}
