
export type PokemonsList = {
  count: number
  next: string
  previous: null
  results: {
    name: string
    url: string
  }[]
}

 type Stat = {
  name: string
  url: string
}
 type Type = {
  name: string
  url: string
}

export type Pokemon = {
  id: number
  name: string
  types: {
    type: Type
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: Stat
  }[]
}
