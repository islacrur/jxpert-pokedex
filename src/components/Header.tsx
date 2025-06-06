import React from 'react'
import pokeball from './assets/pokeball.svg'

type HeaderProps = {
  title?: string
  logo?: string
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Pokémon',
  logo = pokeball,
}) => {
  return (
    <header className="header">
      <img src={logo} alt="" className="headerlogo" />
      <p className="headertitle">{title}</p>
    </header>
  )
}
