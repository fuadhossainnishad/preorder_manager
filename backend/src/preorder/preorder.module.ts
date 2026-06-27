import { Module } from '@nestjs/common';
import { PreorderController } from './preorder.controller';
import { PreorderService } from './preorder.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PreorderController],
  providers: [PreorderService],
})
export class PreorderModule {}