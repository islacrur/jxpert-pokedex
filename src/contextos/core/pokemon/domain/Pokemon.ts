import { Stats } from './Stat'
import { Type } from './Type'

export interface Pokemon {
  id: number
  name: string
  types: {
    type: Type
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: Stats
  }[]
}
