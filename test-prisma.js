const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
    console.log('Testing connection to:', process.env.DATABASE_URL);
    try {
        await prisma.$connect();
        console.log('SUCCESS: Connected to database');
        const userCount = await prisma.user.count();
        console.log('User count:', userCount);
    } catch (err) {
        console.error('FAILURE:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
