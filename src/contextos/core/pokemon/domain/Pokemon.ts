import { Stat } from './Stat'

export interface Pokemon {
  id:number;
  name: string;
  imageUrl: string;
  primarytype:string
  secondarytype:string
  stats: Stat[];
}
