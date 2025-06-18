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
import { CardContent } from '../components'
import { Pokemon } from '../contextos/core/pokemon/domain/Pokemon'



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
                src={icons[pokemon.primarytype]}
                className="card__type"
                alt={`${pokemon.primarytype} primary type`}
              />
              {pokemon.secondarytype && (
                <img
                  src={icons[pokemon.secondarytype]}
                  className="card__type"
                  alt={`${pokemon.secondarytype} secondary type`}
                />
              )}
            </div>
          </header>
          <img
            className="card__avatar"
            src={pokemon.imageUrl}
            loading="lazy"
            alt={`${name} artwork`}
          />
          <CardContent title={pokemon.name} stats={pokemon.stats} />
        </article>
      </li>
    </>
  )
}
