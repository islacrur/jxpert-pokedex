import { useEffect, useState } from 'react'
import{REGIONS, Region, Pokemon, PokemonsList, CRITERIA, Criteria} from '../appTypes'
import{pokemonsService} from '../core/services/pokemonsService'



function sortPokemon(
  pokemonData: Pokemon[],
  criteria: keyof typeof CRITERIA | 'default',
): Pokemon[] {
  if (criteria === 'default') {
    return [...pokemonData].sort((a, b) => a.id - b.id)
  }

  const statKey = CRITERIA[criteria]
  if (!statKey) return pokemonData

  return [...pokemonData].sort((a, b) => {
    const aStat = a.stats.find((s) => s.stat.name === statKey)
    const bStat = b.stats.find((s) => s.stat.name === statKey)
    return (bStat?.base_stat ?? 0) - (aStat?.base_stat ?? 0)
  })
}

export const usePokemonData = () => {
  const [cardsLoader, setCardsLoader] = useState<boolean>(false)
  const [pokemons, setPokemons] = useState<any>([])
  const [region, setRegion] = useState<Region>('kanto')
  const [filter, setFilter] = useState<boolean>(false)
  const [finalResult, setFinalResult] = useState<any>([])
  const [search, setSearch] = useState<string>('')
  const [criteria, setCriteria] = useState<string>('default')

  useEffect(() => {
    const uploadPokemonData = async () => {
      setCardsLoader(true)
      setFilter(true)
      const result = await pokemonsService.getAllPokemons(region);
      setPokemons(result)
      setFinalResult(result)
      setCardsLoader(false)
    }
    uploadPokemonData()
  }, [region])

    /**
     * Filters results based on input query term.
     */
    useEffect(() => {
      setFinalResult(
        pokemons.filter(
          (pokemon: Pokemon) =>
            pokemon.name.includes(search.toLowerCase()) ||
            !!pokemon.types.find((type) =>
              type.type.name.startsWith(search.toLowerCase()),
            ),
        ),
      )
      setFilter(false)
    }, [pokemons[0]?.id, search])

   useEffect(() => {
    setFinalResult((prev) => sortPokemon(prev, criteria))
  }, [criteria])

  return { pokemons,  finalResult, loading: cardsLoader , filter, search,
     setSearch, region, setRegion, criteria, setCriteria}

}