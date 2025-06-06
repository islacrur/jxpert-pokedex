import React, { useEffect, useState } from 'react'
import { CriteriaProgressBar } from './CriteriaProgressBar'
import bug from './assets/bug.svg'
import dark from './assets/dark.svg'
import dragon from './assets/dragon.svg'
import electric from './assets/electric.svg'
import fairy from './assets/fairy.svg'
import fighting from './assets/fighting.svg'
import fire from './assets/fire.svg'
import flying from './assets/flying.svg'
import ghost from './assets/ghost.svg'
import grass from './assets/grass.svg'
import ground from './assets/ground.svg'
import ice from './assets/ice.svg'
import normal from './assets/normal.svg'
import poison from './assets/poison.svg'
import psychic from './assets/psychic.svg'
import rock from './assets/rock.svg'
import steel from './assets/steel.svg'
import water from './assets/water.svg'

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

type CardProps = {
  name: string
}
type Region = keyof typeof REGIONS

const REGIONS = {
  kanto: { regionStart: 0, regionEnd: 151 },
  johto: { regionStart: 151, regionEnd: 251 },
  hoenn: { regionStart: 251, regionEnd: 386 },
  sinnoh: { regionStart: 386, regionEnd: 494 },
  unova: { regionStart: 494, regionEnd: 649 },
  kalos: { regionStart: 649, regionEnd: 721 },
  alola: { regionStart: 721, regionEnd: 809 },
  galar: { regionStart: 809, regionEnd: 905 },
  paldea: { regionStart: 905, regionEnd: 1025 },
} as const

type PokemonsList = {
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

type Pokemon = {
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

const pokemonData = async (region: Region) => {
  const activeRegion = REGIONS[region]
  const regionStart = activeRegion.regionStart
  const regionEnd = activeRegion.regionEnd

  const { results }: PokemonsList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${regionStart}&limit=${regionEnd}`,
  ).then((response) => response.json())

  const result: Pokemon[] = await Promise.all(
    results.map(
      async ({ url }) => await fetch(url).then((response) => response.json()),
    ),
  )
  return result
}
export const Card: React.FC<CardProps> = ({}) => {
  const [cardsLoader, setCardsLoader] = useState<boolean>(false)
  const [finalResult, setFinalResult] = useState<any>([])
  const [filter, setFilter] = useState<boolean>(false)
  const [setPokemons] = useState<any>([])
  const [region] = useState<Region>('kanto')

  useEffect(() => {
    const uploadPokemonData = async () => {
      setCardsLoader(true)
      setFilter(true)

      const result = await pokemonData(region)

      setPokemons(result)
      setFinalResult(result)
      setCardsLoader(false)
    }
    uploadPokemonData()
  }, [region])
  return (
    <>
      {!filter && !cardsLoader && finalResult.length > 0 && (
        <ul className="grid">
          {finalResult.map((pokemon) => {
            const customStyles: any = {
              '--color-type': `var(--color-${pokemon.types[0].type.name}`,
            }
            return (
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
                    src={
                      pokemon.sprites.other['official-artwork'].front_default
                    }
                    loading="lazy"
                    alt={`${pokemon.name} artwork`}
                  />
                  <section className="card__content">
                    <h3 className="card__title">{pokemon.name}</h3>
                    <ul aria-description="Stats resume">
                      <CriteriaProgressBar
                        statName="Hp"
                        statValue={pokemon.stats[0].base_stat}
                      />
                      <CriteriaProgressBar
                        statName="At"
                        statValue={pokemon.stats[1].base_stat}
                      />
                      <CriteriaProgressBar
                        statName="Df"
                        statValue={pokemon.stats[2].base_stat}
                      />
                      <CriteriaProgressBar
                        statName="SpA"
                        statValue={pokemon.stats[3].base_stat}
                      />
                      <CriteriaProgressBar
                        statName="SpD"
                        statValue={pokemon.stats[4].base_stat}
                      />
                      <CriteriaProgressBar
                        statName="Spd"
                        statValue={pokemon.stats[5].base_stat}
                      />
                    </ul>
                  </section>
                </article>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
