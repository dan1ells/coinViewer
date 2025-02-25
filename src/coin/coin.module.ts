import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  providers: [CoinService, PrismaService],
  controllers: [CoinController],
  exports: [CoinService],
})
export class CoinModule {}
