// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
  },


};
