
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import 'dotenv/config';
import { PrismaClient, PreorderWhen } from '../src/generated/client';

// The URL from .env includes "file:", but the adapter expects a plain path or URL.
// We can keep it as is – PrismaBetterSQLite3 accepts "file:" URLs.
const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL as string,  // e.g., "file:./dev.db"
});
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.preorder.createMany({
        data: [
            {
                name: 'Multi variant 3',
                products: 1,
                preorderWhen: PreorderWhen.out_of_stock,
                startsAt: new Date('2025-12-15T20:24:00Z'),
                endsAt: new Date('2025-12-15T20:24:00Z'),
                status: true,
            },
            // Add more rows as needed
        ],
    });
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());