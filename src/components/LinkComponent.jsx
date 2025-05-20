import React from 'react'

const Link = ({href="#", className="bg-[#000080] text-white", title="Button"}) => {
  return (
    // <div className='px-20 py-10 border-2 border-[#000080] bg-white rounded-lg shadow-lg'>
      <a href={href} className={className} >
        {title}
      </a>
    // </div>
  )
}

export default Link