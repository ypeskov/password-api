import { Knex } from "knex";

const TABLE_NAME = 'folders';


export async function up(knex: Knex): Promise<void> {
  console.log(`Starting creatin [${TABLE_NAME}] table.`);

  await knex.schema.createTable(TABLE_NAME, (table: Knex.CreateTableBuilder) => {
    table.increments('id');
    table.string('name').unique();

    table.timestamps(true);
  });
  
  console.log(`[${TABLE_NAME}] table is created`);
}


export async function down(knex: Knex): Promise<void> {
  console.log(`Dropping [${TABLE_NAME}] table.`);
  await knex.schema.dropTable(TABLE_NAME);
  console.log(`[${TABLE_NAME}] table is dropped.`)
}

