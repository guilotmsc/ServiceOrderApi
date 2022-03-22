import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('OrderItem', table => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();

    table
      .integer('orderId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('Order')
      .onDelete('CASCADE');

    table.integer('quantity').notNullable();
    table.decimal('amount', 14, 2).notNullable();

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('OrderItem');
}
