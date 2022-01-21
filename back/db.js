const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "Mcdeltateta1460",
    host: "localhost",
    port: "5432",
    database: "noteapp",
});
module.exports = pool;
