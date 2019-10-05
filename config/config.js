require('dotenv').config(); // this is important!
module.exports = {
  {
    "development": {
      "username": process.env.USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host":  process.env.DB_HOST,
      "dialect": process.env.DB_DIALECT,
      "operatorsAliases": false
    },
    "test": {
      "username": process.env.USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host":  process.env.DB_HOST,
      "dialect": process.env.DB_DIALECT,
      "operatorsAliases": false
    },
    "production": {
      "username": process.env.USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host":  process.env.DB_HOST,
      "dialect": process.env.DB_DIALECT,
      "operatorsAliases": false
    }
  }
}
