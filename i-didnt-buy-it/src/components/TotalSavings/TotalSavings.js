import React from 'react'
import './TotalSavings.css'

const TotalSavings = ({ totalSavings }) => {
  return (
    <div className="total-savings">
      <h2>Total Savings</h2>
      <p className="savings-amount">${totalSavings.toFixed(2)}</p>
    </div>
  )
}

export default TotalSavings