import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/client';  // relative path from src/prisma to src/generated
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as process from 'process';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    public prisma: PrismaClient;

    constructor() {
        console.log('cwd:', process.cwd());
        console.log('DATABASE_URL:', process.env.DATABASE_URL!);
        const adapter = new PrismaBetterSqlite3({
            url: process.env.DATABASE_URL as string,
        });
        this.prisma = new PrismaClient({ adapter });
    }

    async onModuleInit() {
        await this.prisma.$connect();
    }

    async onModuleDestroy() {
        await this.prisma.$disconnect();
    }
}