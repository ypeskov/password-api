import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RecordModule } from './record/record.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: "postgres",
          useNullAsDefault: true,
          connection: {
            host: process.env.RUNES_DB_HOST,
            database: process.env.RUNES_DB_NAME,
            user:     process.env.RUNES_DB_USER,
            password: process.env.RUNES_DB_PASSWORD
          },
        },
      }),
    }),
    AuthModule,
    RecordModule],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
