import { Region } from '../../../../appTypes'
import { Pokemon } from './Pokemon'

export interface PokemonRepository {
  getAllPokemonsByRegion(region: Region): Promise<Pokemon[]>
}
