import React from 'react'
import Carousel from '../components/Carousel'
import pic1 from '../assets/images/img1.jpg';
import pic2 from '../assets/images/img2.jpg';
import pic3 from '../assets/images/img3.jpg';
import pic4 from '../assets/images/img4.jpg';
import SendRequestForm from '../components/SendRequestForm';
import { IoLogoWhatsapp } from "react-icons/io";

const slides = [
  {
    id: 1,
    image: pic2,
    title: 'Slide 1',
    description: 'Description for Slide 1',
  },
  {
    id: 2,
    image: pic1,
    title: 'Slide 2',
    description: 'Description for Slide 2',
  },
  {
    id: 3,
    image: pic3,
    title: 'Slide 3',
    description: 'Description for Slide 3',
  },
  {
    id: 4,
    image: pic4,
    title: 'Slide 4',
    description: 'Description for Slide 4',
  }
]

const Home = () => {
  return (
    <main className='max-w-screen'>

      {/* Hero Section */}
        <div className='relative'>
          <Carousel className="" autoSlide={true}>
            {slides.map((s) => {
              return(
                <img className='' key={s.id} src={s.image} />
              )
            })}
          </Carousel>
          <div className='absolute bottom-[-40px] left-0 right-0 mx-auto'>
          
                  <SendRequestForm/>
                  </div>
        </div>

        <div className='fixed z-10 bottom-[20px] right-0 mr-10 mb-10 bg-[#25D366] w-16 h-16 flex justify-center items-center rounded-full'>

       < IoLogoWhatsapp className='text-white' size={40}/>
        </div>

     {/*  */}
       
    </main>
  )
}

export default Home