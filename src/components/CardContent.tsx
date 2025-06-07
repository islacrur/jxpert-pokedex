import React from 'react'
import { CriteriaProgressBar } from '../components'

type CardContentProps = {
  title: string
  stats: any
}

export const CardContent: React.FC<CardContentProps> = ({ title, stats }) => {
  return (
    <section className="card__content">
      <h3 className="card__title">{title}</h3>
      <ul aria-description="Stats resume">
        <CriteriaProgressBar statName="Hp" statValue={stats[0].base_stat} />
        <CriteriaProgressBar statName="At" statValue={stats[1].base_stat} />
        <CriteriaProgressBar statName="Df" statValue={stats[2].base_stat} />
        <CriteriaProgressBar statName="SpA" statValue={stats[3].base_stat} />
        <CriteriaProgressBar statName="SpD" statValue={stats[4].base_stat} />
        <CriteriaProgressBar statName="Spd" statValue={stats[5].base_stat} />
      </ul>
    </section>
  )
}
