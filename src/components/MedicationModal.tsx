import React from 'react'

interface MedicationModalProps {
    action:'add' | 'edit'
}

const MedicationModal: React.FC<MedicationModalProps> = () => {
  return (
    <div>MedicationModal</div>
  )
}

export default MedicationModal