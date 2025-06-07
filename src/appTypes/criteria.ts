
export type Criteria = {
  [key: string]: string
}

export const CRITERIA: Criteria = {
  hp: 'hp',
  attack: 'attack',
  defense: 'defense',
  specialAttack: 'special-attack',
  specialDefense: 'special-defense',
  speed: 'speed',
  default: 'default',
} as const