import { Knex } from "knex";

const TABLE_NAME = 'secure_records';

export async function up(knex: Knex): Promise<void> {
  console.log(`Starting creatin [${TABLE_NAME}] table.`);

  await knex.schema.createTable(TABLE_NAME, (table: Knex.CreateTableBuilder) => {
    table.increments('id');
    table.string('name');
    table
      .integer('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('folder_id')
      .references('folders.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .defaultTo(null);
    
    table
      .integer('record_type_id')
      .references('record_types.id')
      .onUpdate('CASCADE');

    table.timestamps(true);

    console.log(`[${TABLE_NAME}] table is created`);
  });
}


export async function down(knex: Knex): Promise<void> {
  console.log(`Dropping [${TABLE_NAME}] table.`);
  await knex.schema.dropTable(TABLE_NAME);
  console.log(`[${TABLE_NAME}] table is dropped.`)
}

