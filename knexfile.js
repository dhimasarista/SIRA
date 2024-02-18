// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: "sira_dev",
      user: "root",
      password: "",
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'sira_staging',
      user:     'sira01x029332948',
      password: 'sira01x032798398'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'sira_production',
      user:     'sira01x02327489327',
      password: 'sira01x08397234123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
