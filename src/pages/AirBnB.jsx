import React from 'react'
import Header from '../components/Header'
import RentalListingsGrid from '../components/airbnb/RentalListingsGrid'

const AirBnB = () => {
  return (
    <div>
      <Header title="Beach Bahari BnB" link="airbnb" />
        <div className="min-h-screen bg-gray-100">
      <RentalListingsGrid />
    </div>
    </div>
  )
}

export default AirBnB