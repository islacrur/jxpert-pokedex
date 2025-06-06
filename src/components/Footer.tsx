import React from 'react'

type FooterProps = {
  brand?: string
  startYear?: number
}

export const Footer: React.FC<FooterProps> = ({
  brand = 'Pokémon',
  startYear = 1995,
}) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>
        ©{currentYear} {brand}. ©{startYear} - {currentYear}{' '}
        Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.
      </p>
    </footer>
  )
}
