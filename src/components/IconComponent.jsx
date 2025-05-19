import React from 'react'

const IconComponent = ({link,target="_black",rel="noopener noreferrer",icon},className="cursor-pointer") => {
    const Icon = icon;
  return (
    <a
    href={link}
    target={target}
    rel={rel}
    className={className} >
    <Icon/>
  </a>
  )
}

export default IconComponent