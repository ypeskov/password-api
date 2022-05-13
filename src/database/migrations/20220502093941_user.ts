import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  console.log('Starting creatin [users] table.');

  await knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
    table.increments('id');
    table.string('email').unique();
    table.string('first_name');
    table.string('last_name');
    table.string('hashed_password');
    table.timestamps(true);
  });
  
  console.log('[users] table is created');
}


export async function down(knex: Knex): Promise<void> {
  console.log('Dropping [users] table.');
  await knex.schema.dropTable('users');
  console.log('[users] table is dropped.')
}

