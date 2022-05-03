import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import * as bcrypt from 'bcryptjs';

const USERS_TABLE_NAME = 'users';

export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at?: Date;
  updated_at?: Date;
}

@Injectable()
export class AuthService {
  constructor(@InjectKnex() private readonly db: Knex) { }

  async createUser({ email, password, first_name, last_name }) {
    const userExists = await this.doesUserExist(email);
    if (userExists) {
      throw new HttpException('User exists', HttpStatus.CONFLICT);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const result: User = await this.db(USERS_TABLE_NAME).insert({
      email,
      hashed_password,
      first_name,
      last_name
    },
      ['id', 'email', 'first_name', 'last_name']);

    return result[0] ?? false;
  }

  async doesUserExist(email: string): Promise<any> {
    const user: User | null = await this.getUserByEmail(email);
    return user ? true : false;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.db(USERS_TABLE_NAME).where<User[]>('email', email);
    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }
}
