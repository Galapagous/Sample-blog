import React from 'react'

const AboutCard = ({Logo, title, description}) => {
  return (
    <div>
        <div className="p-10 bg-gray-300 h-[300px] w-fit text-center">
            {Logo}
            <h3 className="font-semibold text-2xl mb-2">{title}</h3>
            <p className="w-[300px] text-sm">{description}</p>
        </div>
    </div>
  )
}

export default AboutCard