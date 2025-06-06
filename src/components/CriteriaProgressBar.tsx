import React from 'react'

type CriteriaProgressBarProps = {
  statName: string
  statValue: number
}

export const CriteriaProgressBar: React.FC<CriteriaProgressBarProps> = ({
  statName,
  statValue,
}) => {
  const STATS_MAX_VALUE: string = '255'

  return (
    <li className="card__stat" aria-label="Health points">
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {statName}
        </p>
        {/* <p>{res.stats[0].base_stat}</p> */}
        <p>{statValue}</p>
      </div>
      <progress value={statValue} max={STATS_MAX_VALUE}></progress>
    </li>
  )
}
