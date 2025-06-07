import { useState } from 'react'
import { Header, Footer, Card } from './components'
import { REGIONS, Region } from './appTypes'
import { usePokemonData } from './hooks/usePokemonData'

export const App = () => {
  const [showSort, setShowSort] = useState<boolean>(false)

  const [showRegions, setShowRegions] = useState<boolean>(false)

  const {
    finalResult,
    loading,
    filter,
    search,
    setSearch,
    region,
    setRegion,
    criteria,
    setCriteria,
  } = usePokemonData()

  return (
    <div className="layout">
      <Header />

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="search__icon"
          >
            <path
              d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L15 15"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search a Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Shows regions */}
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="reg-list"
              aria-label="Select reg"
              aria-expanded={showRegions}
              className={`dropdown__button ${showRegions ? 'active' : ''}`}
              onClick={() =>
                setShowRegions((prev) => {
                  if (showSort) {
                    setShowSort(false)
                  }
                  return !prev
                })
              }
            >
              {region}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="reg-list"
              hidden={!showRegions}
              className={`dropdown__list ${!showRegions ? 'hide' : ''}`}
            >
              {(Object.keys(REGIONS) as Region[]).map((key) => (
                <li
                  key={key}
                  role="radio"
                  aria-checked={region === key}
                  tabIndex={0}
                  className={region === key ? 'active' : ''}
                  onClick={() => {
                    setRegion(key)
                    setShowRegions(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setRegion(key)
                      setShowRegions(false)
                    }
                  }}
                >
                  {key}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={showSort}
            className="sort__button"
            onClick={() =>
              setShowSort((prev) => {
                if (showRegions) setShowRegions(false)
                return !prev
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                showSort ? 'var(--color-accent)' : 'var(--color-neutral-700)'
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

          {/* Muestra el menú de ordenación */}
          {showSort && (
            <article className="sort__wrapper">
              <h3 className="sort__title">Sort by</h3>
              <div className="sort__items" role="listbox" id="sort-list">
                <span
                  role="radio"
                  aria-label="Default"
                  tabIndex={0}
                  className={`sort__pill ${criteria === 'default' ? 'active' : ''}`}
                  aria-checked={criteria === 'default'}
                  onClick={() => {
                    setCriteria('default')
                    setShowSort(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCriteria('default')
                      setShowSort(false)
                    }
                  }}
                >
                  {' '}
                  Default
                </span>
                <span
                  role="radio"
                  aria-label="Health points"
                  tabIndex={0}
                  className={`sort__pill ${criteria === 'hp' ? 'active' : ''}`}
                  aria-checked={criteria === 'hp'}
                  onClick={() => {
                    setCriteria('hp')
                    setShowSort(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCriteria('hp')
                      setShowSort(false)
                    }
                  }}
                >
                  {' '}
                  Hp
                </span>
                <span
                  role="radio"
                  aria-label="Attack"
                  tabIndex={0}
                  className={`sort__pill ${criteria === 'attack' ? 'active' : ''}`}
                  aria-checked={criteria === 'attack'}
                  onClick={() => {
                    setCriteria('attack')
                    setShowSort(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCriteria('attack')
                      setShowSort(false)
                    }
                  }}
                >
                  {' '}
                  At
                </span>
                <span
                  role="radio"
                  aria-label="Defense"
                  tabIndex={0}
                  className={`sort__pill ${criteria === 'defense' ? 'active' : ''}`}
                  aria-checked={criteria === 'defense'}
                  onClick={() => {
                    setCriteria('defense')
                    setShowSort(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCriteria('defense')
                      setShowSort(false)
                    }
                  }}
                >
                  Df
                </span>
                <span
                  role="radio"
                  aria-label="Special attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    criteria === 'specialAttack' ? 'active' : ''
                  }`}
                  aria-checked={criteria === 'specialAttack'}
                  onClick={() => {
                    setCriteria('specialAttack')
                    setShowSort(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCriteria('specialAttack')
                      setShowSort(false)
                    }
                  }}
                >
                  {' '}
                  SpA
                </span>
                <span
                  role="radio"
                  aria-label="Special defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    criteria === 'specialDefense' ? 'active' : ''
                  }`}
                  aria-checked={criteria === 'specialDefense'}
                  onClick={() => {
                    setCriteria('specialDefense')
                    setShowSort(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCriteria('specialDefense')
                      setShowSort(false)
                    }
                  }}
                >
                  SpD
                </span>
                <span
                  role="radio"
                  aria-label="Speed"
                  tabIndex={0}
                  className={`sort__pill ${criteria === 'speed' ? 'active' : ''}`}
                  aria-checked={criteria === 'speed'}
                  onClick={() => {
                    setCriteria('speed')
                    setShowSort(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCriteria('speed')
                      setShowSort(false)
                    }
                  }}
                >
                  {' '}
                  Spd
                </span>
              </div>
            </article>
          )}
        </section>

        <section>
          {(loading || filter) && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <article
                    key={`placeholder-card-${index}`}
                    className="card card-placeholder"
                    data-testid="skeleton"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                    </svg>
                  </article>
                )
              })}
            </div>
          )}
          {/* Prints cards */}
          {!filter && !loading && finalResult.length > 0 && (
            <ul className="grid">
              {finalResult.map((pokemon) => {
                const customStyles: any = {
                  '--color-type': `var(--color-${pokemon.types[0].type.name}`,
                }
                return <Card pokemon={pokemon} customStyles={customStyles} />
              })}
            </ul>
          )}
        </section>
        {!loading && finalResult.length === 0 && (
          <p className="noresults">No results for "{search}"</p>
        )}
      </main>

      <Footer />
    </div>
  )
}
