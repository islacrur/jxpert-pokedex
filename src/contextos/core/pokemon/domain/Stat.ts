export class Stat {
  constructor(
    private _name: string,
    private _url: string,
    private _base_stat: number,
    private _effort: number,
  ) {}
}

export interface Stats {
  hp: number
  att: number
  def: number
  spA: number
  spD: number
  spd: number
}
