import{REGIONS, Region, Pokemon, PokemonsList} from '../../appTypes'

async function getAllPokemons(region: Region) {
  const activeRegion = REGIONS[region]
  const regionStart = activeRegion.regionStart
  const regionEnd = activeRegion.regionEnd

  const { results }: PokemonsList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${regionStart}&limit=${regionEnd}`
  ).then((response) => response.json())

  const result: Pokemon[] = await Promise.all(
    results.map(
      async ({ url }) => await fetch(url).then((response) => response.json())
    )
  )
  return result
}

export const pokemonsService = {
    getAllPokemons
}