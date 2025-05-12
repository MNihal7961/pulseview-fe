import React from 'react'
import type { Goal } from '../types/types'

interface GoalsTableProps {
    data:Goal[]
}
const GoalsTable: React.FC<GoalsTableProps> = ({data}) => {
  return (
    <div>GoalsTable</div>
  )
}

export default GoalsTable