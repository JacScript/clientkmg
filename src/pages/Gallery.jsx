import React from 'react'
import Header from '../components/Header'
import PhotoGallery from '../components/gallery/PhotoGallery'

const Gallery = () => {
  return (
    <div>
        <Header title="Our Gallery" link="gallery"/>
        <PhotoGallery/>
    </div>
  )
}

export default Gallery