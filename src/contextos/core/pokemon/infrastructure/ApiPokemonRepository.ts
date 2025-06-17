// import { Region, REGIONS } from '../../../../appTypes'
// import { PokemonRepository } from '../domain/PokemonRepository'
// import { PokemonList } from '../domain/PokemonList'
// import { Pokemon } from '../domain/Pokemon'
// import { PokemonDTO } from '../domain/PokemonDTO'

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
    const activeRegion = REGIONS[region]
    const regionStart = activeRegion.regionStart
    const regionEnd = activeRegion.regionEnd

    const { results }: PokemonList = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${regionStart}&limit=${regionEnd}`,
    ).then((response) => response.json())

    const result: Pokemon[] = await Promise.all(
      results.map(
        async ({ url }) => await fetch(url).then((response) => response.json()),
      ),
    )
    return result
  }
}
