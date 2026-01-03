const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid'); // Trying to use uuid if available, otherwise crypto

// Credentials from add-sample-data.js
const DATABASE_URL = 'postgresql://root:6tITiMVbnYLnRc3jqd48DvTsD5X5xFsJ@dpg-d57pa56uk2gs73d6kdm0-a.oregon-postgres.render.com/digitfellas';

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function updateInsights() {
    const client = await pool.connect();
    try {
        console.log('Clearing old blog posts...');
        await client.query('DELETE FROM blog_posts');

        // 1. Get or Create Category "Perspectives"
        let categoryId;
        const catRes = await client.query("SELECT id FROM categories WHERE slug = 'perspectives'");
        if (catRes.rows.length > 0) {
            categoryId = catRes.rows[0].id;
        } else {
            categoryId = require('crypto').randomUUID();
            console.log('Creating category "Perspectives"...');
            // Using minimal columns for category if possible. 
            // Schema of categories from add-sample-data: id, name, slug, description, type
            await client.query(
                "INSERT INTO categories (id, name, slug, description, type) VALUES ($1, 'Perspectives', 'perspectives', 'Insights and observations', 'blog')",
                [categoryId]
            );
        }

        const insights = [
            {
                title: "Why most automation initiatives fail after year one",
                slug: "automation-initiatives-fail-year-one",
                excerpt: "Automation isn't just about scripts; it's about maintenance culture. We explore why many projects rot after deployment.",
                published: true,
                content: "<p>Full article content regarding automation failures...</p>"
            },
            {
                title: "When not to choose Shopify for e-commerce",
                slug: "when-not-to-choose-shopify",
                excerpt: "Shopify is powerful, but it's not a silver bullet. Here are the architectural triggers that suggest you need a custom solution.",
                published: true,
                content: "<p>Full article content regarding Shopify limitations...</p>"
            },
            {
                title: "What software audits reveal that dashboards don’t",
                slug: "software-audits-vs-dashboards",
                excerpt: "Green KPIs can hide rotting architecture. Deep code audits reveal the technical debt that monitoring tools miss.",
                published: true,
                content: "<p>Full article content regarding software audits...</p>"
            },
            {
                title: "Designing UI systems that survive scale",
                slug: "designing-ui-systems-survive-scale",
                excerpt: "A design system is a product, not a Figma file. How to build components that don't break when the team grows.",
                published: true,
                content: "<p>Full article content regarding UI systems...</p>"
            }
        ];

        console.log('Inserting new Insights...');
        for (const post of insights) {
            const id = require('crypto').randomUUID();

            // Removed author_name. using category_id.
            await client.query(
                `INSERT INTO blog_posts (id, title, slug, excerpt, content, published_at, is_published, category_id, reading_time_minutes) 
         VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7, 5)`,
                [id, post.title, post.slug, post.excerpt, post.content, post.published, categoryId]
            );
        }

        console.log('Successfully updated Insights & Perspectives.');
    } catch (err) {
        console.error('Error updating insights:', err);
    } finally {
        client.release();
        pool.end();
    }
}

updateInsights();
