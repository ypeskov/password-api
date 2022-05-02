import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectKnex() private readonly db: Knex) { }

  async createUser({email, password, first_name, last_name}) {
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const result = await this.db('users').insert({
      email,
      hashed_password,
      first_name,
      last_name
    });

    console.log(result);

    return result;
  }
}
