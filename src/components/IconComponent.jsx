import React from 'react'

const IconComponent = ({link,target="_black",rel="noopener noreferrer",icon},className="cursor-pointer" ,size="18") => {
    const Icon = icon;
  return (
    <a
    href={link}
    target={target}
    rel={rel}
    className={className} >
    <Icon size={size}/>
  </a>
  )
}

export default IconComponent