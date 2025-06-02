import React from 'react'
import Header from '../components/Header'
import PhotoGallery from '../components/gallery/PhotoGallery'
import { Helmet } from 'react-helmet'

const Gallery = () => {
  return (
    <div>
       <Helmet>
        <title>KM - Home</title>
      </Helmet>
        <Header title="Our Gallery" link="gallery"/>
        <PhotoGallery/>
    </div>
  )
}

export default Gallery