import React from 'react'

// 1️⃣ Creamos un contexto React (invisible pero compartido)
const CriteriaButtonGroupContext = React.createContext<{
  criteria: string
  setCriteria: (value: string) => void
  setShowSort: (value: boolean) => void
} | null>(null)

// 2️⃣ Creamos el componente padre que provee el contexto a sus hijos
export const CriteriaButtonGroup: React.FC<{
  criteria: string
  setCriteria: (value: string) => void
  setShowSort: (value: boolean) => void
  children: React.ReactNode
}> = ({ criteria, setCriteria, setShowSort, children }) => {
  return (
    <CriteriaButtonGroupContext.Provider
      value={{ criteria, setCriteria, setShowSort }}
    >
      {children}
    </CriteriaButtonGroupContext.Provider>
  )
}

// 3️⃣ Creamos un hook personalizado que encapsula el acceso al contexto
export const useCriteriaButtonGroup = () => {
  const context = React.useContext(CriteriaButtonGroupContext)
  if (!context) {
    throw new Error('useCriteriaButtonGroup debe usarse dentro de <CriteriaButtonGroup>')
  }
  return context
}