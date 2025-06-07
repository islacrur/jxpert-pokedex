import React from 'react'
import { useCriteriaButtonGroup } from './CriteriaButtonGroup'

type CriteriaButtonProps = {
  label: string
  value: string 
  ariaLabel?: string
}


export const CriteriaButton: React.FC<CriteriaButtonProps> = ({ label, value, ariaLabel}) => {
  const { criteria, setCriteria, setShowSort } = useCriteriaButtonGroup();
  const isActive = criteria === value;
  const handleClic = () => {
    setCriteria(value)
    setShowSort(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      setCriteria(value)
      setShowSort(false)
    }
  }
  return (
    <span
      role="radio"
      aria-label={ariaLabel}
      tabIndex={0}
      className={`sort__pill ${isActive ? 'active' : ''}`}
      aria-checked={isActive}
      onClick={handleClic}
      onKeyDown={handleKeyDown}
    >
      {label}
    </span>
  )
}
