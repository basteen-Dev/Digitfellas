const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://root:6tITiMVbnYLnRc3jqd48DvTsD5X5xFsJ@dpg-d57pa56uk2gs73d6kdm0-a.oregon-postgres.render.com/digitfellas';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkClientLogosSchema() {
    const client = await pool.connect();
    try {
        const res = await client.query(`
      SELECT column_name
      FROM information_schema.columns 
      WHERE table_name = 'client_logos'
      ORDER BY column_name;
    `);
        console.log('--- COLUMNS START ---');
        res.rows.forEach(r => console.log(r.column_name));
        console.log('--- COLUMNS END ---');
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        pool.end();
    }
}

checkClientLogosSchema();
