export interface PokemonDTO {
  id:number;
  name: string;
  artwork: string;
  types: string[];
  stats: {
    name: string;
    base: number;
    effort: number;
    url: string;
  }[];
}