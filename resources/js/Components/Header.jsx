import React from 'react'

const Header = ({title,img}) => {
  return (
    <header className="relative h-[60vh] overflow-hidden ">
    <img
        src={img}
        alt={title}
        draggable='false'
        className="size-full object-cover"
    />
    <div className="absolute top-0 left-0 size-full bg-black text-6xl font-semibold text-text-white  flex justify-center items-center bg-opacity-50">
        {title}
    </div>
</header>
  )
}

export default Header
