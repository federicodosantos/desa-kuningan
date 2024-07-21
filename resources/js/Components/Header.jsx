import React from 'react'

const Header = ({title,img}) => {
  return (
    <header className="relative lg:h-[60vh] h-screen overflow-hidden flex items-center justify-center ">
    <img
        src={img}
        alt={title}
        draggable='false'
        className="size-full object-cover"
    />
    <div className="absolute top-0 left-0 size-full bg-black   flex justify-center items-center bg-opacity-50">
        
    </div>
    <p data-aos="fade-up" data-aos-duration="1000"  className='absolute md:text-5xl text-4xl text-center lg:text-6xl font-semibold text-text-white'>{title}</p>
</header>
  )
}

export default Header
