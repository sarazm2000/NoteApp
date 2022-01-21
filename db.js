const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "o91759o9576",
    host: "localhost",
    port: "5432",
    database: "noteapp",
});
module.exports = pool;
