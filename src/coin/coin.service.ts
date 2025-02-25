/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ListCoinsDTO, ShowCoinDTO } from './coin.dto';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class CoinService {
  constructor(private readonly prisma: PrismaService) {}
  async getBitcoinInfo() {
    const valorUrl =
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true';
    const valorResposta = await fetch(valorUrl);
    const valorData = await valorResposta.json();

    const historiaUrl7Dias =
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30';
    const historiaResposta7Dias = await fetch(historiaUrl7Dias);
    const historiaData7dias = await historiaResposta7Dias.json();

    const valores7Dias = historiaData7dias.prices.map((preco) => preco[1]);

    const valor7dAtras = valores7Dias[0];
    const valorAtual = valores7Dias[valores7Dias.length - 1];
    const valorChange7d = ((valorAtual - valor7dAtras) / valor7dAtras) * 100;

    const historiaUrl =
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30';
    const historiaResposta = await fetch(historiaUrl);
    const historiaData = await historiaResposta.json();

    const valores = historiaData.prices.map((preco) => preco[1]);
    const allTimeHigh = Math.max(...valores);
    const allTimeLow = Math.min(...valores);

    // Formatar a resposta
    return {
      market_cap: valorData.bitcoin.usd_market_cap.toString(),
      var_24_horas: valorData.bitcoin.usd_24h_change.toString(),
      var_7_dias: valorChange7d.toString(),
      valor_hist_mais_alto: allTimeHigh.toString(),
      valor_hist_mais_baixo: allTimeLow.toString(),
      valor_atual: valorData.bitcoin.usd.toString(),
    };
  }

  async index() {
    const model = await this.prisma.coin.findMany({});

    const result = model.map((coin) => {
      return {
        id: coin.id,
        market_cap: coin.market_cap,
        var_24_horas: coin.var_24_horas,
        var_7_dias: coin.var_7_dias,
        valor_hist_mais_alto: coin.valor_hist_mais_alto,
        valor_hist_mais_baixo: coin.valor_hist_mais_baixo,
        valor_atual: coin.valor_atual,
      } as ListCoinsDTO;
    });

    return { result };
  }

  async show(id: number) {
    const coin = await this.prisma.coin.findFirst({
      where: {
        id: id,
      },
    });

    if (!coin) {
      throw new HttpException('Moeda não Encontrada', HttpStatus.NOT_FOUND);
    }

    const coinDTO = new ShowCoinDTO(
      coin.id,
      coin.market_cap,
      coin.var_24_horas,
      coin.var_7_dias,
      coin.valor_hist_mais_alto,
      coin.valor_hist_mais_baixo,
      coin.valor_atual,
    );

    return coinDTO;
  }

  async save() {
    const data = await this.getBitcoinInfo();

    const result = await this.prisma.coin.create({ data });

    return this.show(result.id);
  }
}
