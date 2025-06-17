import { Stats } from './Stat'
import { Type } from './Type'

export class Pokemon {
  constructor(
    private _id: number,
    private _name: string,
    private _types: Type[],
    private _stats: Stats,
  ) {}
}
