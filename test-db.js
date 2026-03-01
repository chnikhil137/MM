const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
});
client.connect().then(() => {
    console.log('SUCCESS');
    process.exit(0);
}).catch(err => {
    console.error('FAILURE', err.message);
    process.exit(1);
});
