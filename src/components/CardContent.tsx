import React from 'react'
import { CriteriaProgressBar } from '../components'
import { Stat } from '../contextos/core/pokemon/domain/Stat'
import { Star } from 'lucide-react'

type CardContentProps = {
  title: string
  stats: Stat[]
}

export const CardContent: React.FC<CardContentProps> = ({ title, stats }) => {
  return (
    <section className="card__content">
      <div className="star-container">
        <Star size={20} color="gold" fill="gold" />
      </div>
      <h3 className="card__title">{title}</h3>
      <ul aria-description="Stats resume">
        <CriteriaProgressBar statName="Hp" statValue={stats[0].baseValue} />
        <CriteriaProgressBar statName="At" statValue={stats[1].baseValue} />
        <CriteriaProgressBar statName="Df" statValue={stats[2].baseValue} />
        <CriteriaProgressBar statName="SpA" statValue={stats[3].baseValue} />
        <CriteriaProgressBar statName="SpD" statValue={stats[4].baseValue} />
        <CriteriaProgressBar statName="Spd" statValue={stats[5].baseValue} />
      </ul>
    </section>
  )
}
