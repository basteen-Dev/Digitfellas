const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://root:6tITiMVbnYLnRc3jqd48DvTsD5X5xFsJ@dpg-d57pa56uk2gs73d6kdm0-a.oregon-postgres.render.com/digitfellas';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkSchema() {
    const client = await pool.connect();
    try {
        // Select 1 row. If table is empty, we must rely on schema query again but format it better.
        // Let's try schema query again but force it to be very short lines.
        const res = await client.query(`
      SELECT column_name
      FROM information_schema.columns 
      WHERE table_name = 'blog_posts'
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

checkSchema();
