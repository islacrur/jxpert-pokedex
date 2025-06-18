// import { Region, REGIONS } from '../../../../appTypes'
// import { PokemonRepository } from '../domain/PokemonRepository'
// import { PokemonList } from '../domain/PokemonList'
// import { Pokemon } from '../domain/Pokemon'
import { PokemonDTO } from '../domain/PokemonDTO'

// export class ApiPokemonRepository implements PokemonRepository {
//   async getAllPokemonsByRegion(region: Region): Promise<Pokemon[]> {
//     const activeRegion = REGIONS[region]
//     const regionStart = activeRegion.regionStart
//     const regionEnd = activeRegion.regionEnd

//     const { results }: PokemonList = await fetch(
//       `https://pokeapi.co/api/v2/pokemon?offset=${regionStart}&limit=${regionEnd}`,
//     ).then((response) => response.json())

//     // Definir interfaz del DTO: lo que devuelve la pokeapi
//     const pokemonsDTO: PokemonDTO[] = await Promise.all(
//       results.map(
//         async ({ url }) => await fetch(url).then((response) => response.json()),
//       ),
//     )

//     return pokemonsDTO.map((pokemonDTO) => mapPokemonDTOToPokemon(pokemonDTO))
//   }
// }

// const mapPokemonDTOToPokemon = (pokemonDTO: PokemonDTO): Pokemon => {
//   const pokemon: Pokemon = {
//     id: pokemonDTO.id,
//     name: pokemonDTO.name,
//     types: [],
//     stats: [],
//   }
//   console.log('===================>', pokemon)
//   return pokemon
// }

import { Region, REGIONS } from '../../../../appTypes'
import { PokemonRepository } from '../domain/PokemonRepository'
import { PokemonList } from '../domain/PokemonList'
import { Pokemon } from '../domain/Pokemon'

export class ApiPokemonRepository implements PokemonRepository {
  async getAllPokemonsByRegion(region: Region): Promise<Pokemon[]> {
    const activeRegion = REGIONS[region];
    const regionStart = activeRegion.regionStart;
    const regionEnd = activeRegion.regionEnd;

    const { results }: PokemonList = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${regionStart}&limit=${regionEnd}`
    ).then((response) => response.json());

    const pokemonsDTO: PokemonDTO[] = await Promise.all(
      results.map(async ({ url }) => {
        const data = await fetch(url).then((res) => res.json());

        const dto: PokemonDTO = {
          id: data.id,
          name: data.name,
          artwork: data.sprites.other['official-artwork'].front_default,
          types: data.types.map((t: any) => t.type.name),
          stats: data.stats.map((s: any) => ({
            name: s.stat.name,
            base: s.base_stat,
            effort: s.effort,
            url: s.stat.url,
          })),
        };

        return dto;
      })
    );

    return pokemonsDTO.map((pokemonDTO) => this.mapPokemonDTOToPokemon(pokemonDTO));
  }

 mapPokemonDTOToPokemon(pokemonDTO: PokemonDTO): Pokemon {
  return {
    id: pokemonDTO.id,
    name: pokemonDTO.name,
    imageUrl: pokemonDTO.artwork,
    primarytype: pokemonDTO.types[0] || '',
    secondarytype: pokemonDTO.types[1] || '',
    stats: pokemonDTO.stats.map(stat => ({
      name: stat.name,
      baseValue: stat.base,
      effort: stat.effort,
      url: stat.url,
    })),
  };
}
}
