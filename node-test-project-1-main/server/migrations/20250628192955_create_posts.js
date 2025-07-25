/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments('id').primary()
    table.string('link').notNullable()
    table.string('title').notNullable()
    table.text('descr').notNullable()
    table.text('date').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
