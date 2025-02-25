export class ListCoinsDTO {
  constructor(
    readonly id: number,
    readonly market_cap: string,
    readonly var_24_horas: string,
    readonly var_7_dias: string,
    readonly valor_hist_mais_alto: string,
    readonly valor_hist_mais_baixo: string,
    readonly valor_atual: string,
  ) {}
}

export class ShowCoinDTO {
  constructor(
    readonly id: number,
    readonly market_cap: string,
    readonly var_24_horas: string,
    readonly var_7_dias: string,
    readonly valor_hist_mais_alto: string,
    readonly valor_hist_mais_baixo: string,
    readonly valor_atual: string,
  ) {}
}
