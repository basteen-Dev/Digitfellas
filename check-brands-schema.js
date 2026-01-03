const { Pool } = require('pg');

// Credentials from add-sample-data.js
const DATABASE_URL = 'postgresql://root:6tITiMVbnYLnRc3jqd48DvTsD5X5xFsJ@dpg-d57pa56uk2gs73d6kdm0-a.oregon-postgres.render.com/digitfellas';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkBrandsSchema() {
    const client = await pool.connect();
    try {
        const res = await client.query(`
      SELECT column_name
      FROM information_schema.columns 
      WHERE table_name = 'brands' OR table_name = 'sponsors'
      ORDER BY table_name, column_name;
    `);
        console.log('--- COLUMNS START ---');
        res.rows.forEach(r => console.log(r.column_name));
        console.log('--- COLUMNS END ---');

        // Also list tables to be sure
        const tables = await client.query(`
        SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
    `);
        console.log('--- TABLES ---');
        tables.rows.forEach(r => console.log(r.table_name));

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        pool.end();
    }
}

checkBrandsSchema();
