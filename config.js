'use-strict'
const fs = require('fs')


const env = process.env;

const config = {
  db: { 
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'homertor',
    password: env.DB_PASSWORD || 'homertor',
    database: env.DB_NAME || 'node_mysql'
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;