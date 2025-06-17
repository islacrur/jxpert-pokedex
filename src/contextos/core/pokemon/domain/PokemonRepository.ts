import { PokemonsList, Region } from '../../../../appTypes'

export interface PokemonRepository {
  getAllPokemonsByRegion(region: Region): PokemonsList
}
