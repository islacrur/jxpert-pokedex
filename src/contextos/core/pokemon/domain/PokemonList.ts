export class PokemonList {
  constructor(
    public results: Result[],
  ) {}
}

export class Result {
  constructor(
    private _name: string,
    public url: string,
  ) {}
}
