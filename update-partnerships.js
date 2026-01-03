const { Pool } = require('pg');

// Credentials from add-sample-data.js
const DATABASE_URL = 'postgresql://root:6tITiMVbnYLnRc3jqd48DvTsD5X5xFsJ@dpg-d57pa56uk2gs73d6kdm0-a.oregon-postgres.render.com/digitfellas';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function updatePartnerships() {
    const client = await pool.connect();
    try {
        console.log('Adding partnerships to client_logos...');

        const partnerships = [
            { name: "Shopify Partner", logo_url: "/images/partners/shopify.svg", website_url: "https://shopify.com" },
            { name: "Salesforce Partner", logo_url: "/images/partners/salesforce.svg", website_url: "https://salesforce.com" }
        ];

        for (const p of partnerships) {
            // Check if exists
            const res = await client.query("SELECT id FROM client_logos WHERE name = $1", [p.name]);
            if (res.rows.length === 0) {
                const id = require('crypto').randomUUID();
                await client.query(`
                INSERT INTO client_logos (id, name, logo_url, website_url, is_published, sort_order)
                VALUES ($1, $2, $3, $4, true, 10)
            `, [id, p.name, p.logo_url, p.website_url]);
                console.log(`Inserted ${p.name}`);
            } else {
                console.log(`Skipped ${p.name} (already exists)`);
            }
        }

        console.log('Successfully added partnerships.');
    } catch (err) {
        console.error('Error updating partnerships:', err);
    } finally {
        client.release();
        pool.end();
    }
}

updatePartnerships();
