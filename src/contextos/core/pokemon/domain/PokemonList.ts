export class PokemonList {
  constructor(
    private _count: number,
    private _next: string,
    private _previous: null,
    private _results: Result[],
  ) {}
}

export class Result {
  constructor(
    private _name: string,
    private _url: string,
  ) {}
}
