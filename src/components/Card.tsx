import React from 'react'
import bug from '../assets/bug.svg'
import dark from '../assets/dark.svg'
import dragon from '../assets/dragon.svg'
import electric from '../assets/electric.svg'
import fairy from '../assets/fairy.svg'
import fighting from '../assets/fighting.svg'
import fire from '../assets/fire.svg'
import flying from '../assets/flying.svg'
import ghost from '../assets/ghost.svg'
import grass from '../assets/grass.svg'
import ground from '../assets/ground.svg'
import ice from '../assets/ice.svg'
import normal from '../assets/normal.svg'
import poison from '../assets/poison.svg'
import psychic from '../assets/psychic.svg'
import rock from '../assets/rock.svg'
import steel from '../assets/steel.svg'
import water from '../assets/water.svg'
import { CardContent } from './CardContent'

type Icons = {
  [key: string]: string
}

const icons: Icons = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
}

type Stat = {
  name: string
  url: string
}
type Type = {
  name: string
  url: string
}

type Pokemon = {
  id: number
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: {
    type: Type
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: Stat
  }[]
}

type CardProps = {
  pokemon: Pokemon
  customStyles: any
}
export const Card: React.FC<CardProps> = ({ pokemon, customStyles }) => {
  return (
    <>
      <li key={`pokemon-card-${pokemon.id}`}>
        <article className="card" style={customStyles}>
          <header className="card__head">
            <div className="card__tag">
              <p>#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
            <div className="card__tag">
              <img
                src={icons[pokemon.types[0].type.name]}
                className="card__type"
                alt={`${pokemon.types[0].type.name} primary type`}
              />
              {pokemon.types[1] && (
                <img
                  src={icons[pokemon.types[1].type.name]}
                  className="card__type"
                  alt={`${pokemon.types[1].type.name} secondary type`}
                />
              )}
            </div>
          </header>
          <img
            className="card__avatar"
            src={pokemon.sprites.other['official-artwork'].front_default}
            loading="lazy"
            alt={`${name} artwork`}
          />
          <CardContent title={pokemon.name} stats={pokemon.stats} />
        </article>
      </li>
    </>
  )
}
