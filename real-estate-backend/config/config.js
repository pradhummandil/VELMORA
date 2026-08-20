require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: process.env.DATABASE_URL ? "DATABASE_URL" : undefined,
    url: process.env.DATABASE_URL,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "1572001",
    database: process.env.DB_NAME || "real_estate_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    dialectOptions: process.env.DATABASE_URL && process.env.DATABASE_URL.includes("render.com") ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "1572001",
    database: process.env.DB_NAME_TEST || "real_estate_db_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
