import React from 'react'

const TitleSection = ({title,subTitle}) => {
  return (
    <div className="flex flex-col gap-3 border-b pb-4 ">
    <h1
        data-aos="fade-right"
        data-aos-duration="1500"
        className="lg:text-5xl text-3xl font-semibold text-primary-orange"
    >
        {title}
    </h1>
    {
      subTitle&&(
    <p
        data-aos="fade-up"
        data-aos-duration="1800"
        className="lg:text-base text-sm"
    >
       {subTitle}
    </p>

      )
    }
</div>
  )
}

export default TitleSection
