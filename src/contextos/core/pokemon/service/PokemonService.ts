import { Region } from '../../../../appTypes'
import { Pokemon } from '../domain/Pokemon'
import { PokemonRepository } from '../domain/PokemonRepository'

export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}

  getAllPokemonsByRegion(region: Region): Promise<Pokemon[]> {
    const listPokemonByRegion: Promise<Pokemon[]> =
      this.pokemonRepository.getAllPokemonsByRegion(region)
    return listPokemonByRegion
  }
}
