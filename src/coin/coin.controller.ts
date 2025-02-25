import { Controller, Get, Param, Post } from '@nestjs/common';
import { CoinService } from './coin.service';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Get('/bit')
  async getBitcoinInfo() {
    return this.coinService.getBitcoinInfo();
  }

  @Get()
  async index() {
    return this.coinService.index();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.coinService.show(id);
  }

  @Post()
  create() {
    return this.coinService.save();
  }
}
