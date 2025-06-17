export class PokemonList {
  constructor(
    // private _count: number,
    // private _next: string,
    // private _previous: null,
    public results: Result[],
  ) {}
}

export class Result {
  constructor(
    private _name: string,
    public url: string,
  ) {}
}
