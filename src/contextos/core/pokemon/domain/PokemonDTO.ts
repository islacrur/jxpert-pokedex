export class PokemonDTO {
  id: number
  name: string
  type: string
  level: number
  hp: number
  attack: number
  defense: number

  constructor(
    id: number,
    name: string,
    type: string,
    level: number,
    hp: number,
    attack: number,
    defense: number,
  ) {
    this.id = id
    this.name = name
    this.type = type
    this.level = level
    this.hp = hp
    this.attack = attack
    this.defense = defense
  }
}
