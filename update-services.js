const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const DATABASE_URL = 'postgresql://root:6tITiMVbnYLnRc3jqd48DvTsD5X5xFsJ@dpg-d57pa56uk2gs73d6kdm0-a.oregon-postgres.render.com/digitfellas';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const capabilities = [
    {
        title: 'Digital Product Engineering',
        slug: 'digital-product-engineering',
        description: 'Web and mobile systems engineered for performance, usability, and long-term maintainability.',
        excerpt: 'Web and mobile systems engineered for performance.'
    },
    {
        title: 'Commerce & Platform Engineering',
        slug: 'commerce-platform-engineering',
        description: 'Scalable commerce and enterprise platforms built on Shopify, Salesforce, and custom architectures.',
        excerpt: 'Scalable commerce and enterprise platforms.'
    },
    {
        title: 'AI & Automation Engineering',
        slug: 'ai-automation-engineering',
        description: 'Agentic AI systems and intelligent automation designed to reduce operational friction and improve decision-making.',
        excerpt: 'Agentic AI systems and intelligent automation.'
    },
    {
        title: 'Security & Assurance',
        slug: 'security-assurance',
        description: 'Cyber security consulting and software audit services to strengthen reliability, compliance, and trust.',
        excerpt: 'Cyber security consulting and software audit services.'
    }
];

async function updateServices() {
    console.log('🚀 Updating services...');
    try {
        // 1. Clear existing services
        await pool.query('DELETE FROM services');
        console.log('🗑️  Cleared existing services');

        // 2. Get or Create Category
        let catRes = await pool.query("SELECT id FROM categories WHERE slug = 'capabilities'");
        let catId;
        if (catRes.rows.length > 0) {
            catId = catRes.rows[0].id;
        } else {
            catId = uuidv4();
            await pool.query("INSERT INTO categories (id, name, slug, type) VALUES ($1, 'Capabilities', 'capabilities', 'service')", [catId]);
            console.log('📁 Created Capabilities category');
        }

        // 3. Insert new services
        for (const cap of capabilities) {
            const id = uuidv4();
            await pool.query(`
        INSERT INTO services (id, title, slug, description, excerpt, category_id, is_published, is_featured)
        VALUES ($1, $2, $3, $4, $5, $6, true, true)
      `, [id, cap.title, cap.slug, cap.description, cap.excerpt, catId]);
            console.log(`✅ Added: ${cap.title}`);
        }

        console.log('🎉 Services updated successfully!');
    } catch (error) {
        console.error('❌ Error updating services:', error);
    } finally {
        await pool.end();
    }
}

updateServices();
