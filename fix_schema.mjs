
import { ensureSchema } from './lib/db.js';

console.log('Running schema migration...');
ensureSchema()
    .then(() => {
        console.log('Done.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error:', err);
        process.exit(1);
    });
