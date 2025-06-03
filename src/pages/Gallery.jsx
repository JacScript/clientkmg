import React from 'react'
import Header from '../components/Header'
import PhotoGallery from '../components/gallery/PhotoGallery'
import useTitle from '../components/useTitle'

const Gallery = () => {
  useTitle('Gallery')
  return (
    <div>
      
        <Header title="Our Gallery" link="gallery"/>
        <PhotoGallery/>
    </div>
  )
}

export default Gallery