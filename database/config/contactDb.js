const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "contact_cwa",
    password: "topdawg2145#77",
    port: 5432,
});

module.exports = pool;
