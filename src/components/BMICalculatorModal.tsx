import React from 'react'

interface BMICalculatorModalProps {
    isOpen: boolean,
    handleClose: () => void
}
const BMICalculatorModal: React.FC<BMICalculatorModalProps> = ({ isOpen, handleClose }) => {
  return (
    <div>BMICalculatorModal</div>
  )
}

export default BMICalculatorModal