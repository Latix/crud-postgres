const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: 'admin123',
    database: 'postgres'
});

module.exports = client;