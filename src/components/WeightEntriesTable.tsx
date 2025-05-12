import React from 'react'
import type { WeightEntry } from '../types/types'

interface WeightEntriesTableProps {
    data: WeightEntry[]
}
const WeightEntriesTable: React.FC<WeightEntriesTableProps> = ({data}) => {
  return (
    <div>WeightEntriesTable</div>
  )
}

export default WeightEntriesTable