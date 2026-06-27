import { Module } from '@nestjs/common';
import { PreorderModule } from './preorder/preorder.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    PreorderModule,
  ],
})
export class AppModule { }