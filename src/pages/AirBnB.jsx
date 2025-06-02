import React from 'react'
import Header from '../components/Header'
import RentalListingsGrid from '../components/airbnb/RentalListingsGrid'
import { Helmet } from 'react-helmet'

const AirBnB = () => {
  return (
    <div>
      <Helmet>
        <title>KM - Home</title>
      </Helmet>
      <Header title="Beach Bahari BnB" link="airbnb" />
        <div className="min-h-screen bg-gray-100">
      <RentalListingsGrid />
    </div>
    </div>
  )
}

export default AirBnB