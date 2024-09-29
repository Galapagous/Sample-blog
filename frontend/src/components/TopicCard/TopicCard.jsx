// import { Card } from 'flowbite-react'
// import React from 'react'
// import { FaUser } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import PostImage2 from '../../assets/life.jpg'


// const TopicCard = ({Image, date, title, desc, category}) => {
//   return (
//         <Card className="sm:w-[400px] w-full h-fit overflow-hidden bg-white text-gray-500 px-3 py-4 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
//           <img className='h-[300px] object-cover' src={Image || PostImage2} alt='card profile'/>
//           <div className='flex items-center justify-between gap-4 mt-2'>
//             <span className='text-medium font-semibold'>{date}</span>
//             <div className='flex items-center justify-center gap-2 mt-1'>
//             <FaUser className='w-3 h-3'/>
//             <span>Galapagous</span>
//             </div>
//           </div>
//           <div className='flex items-center justify-between'>
//             <p className='text-[tomato]'>2min read</p>
//             {category && <p>{category}</p>}
//           </div>
//           <Link to='/post/1' className='text-xl font-bold'>{title}</Link>
//           <p className='mt-4 text-xs'>{desc?.split(' ').slice(0, 10).join(' ')} ...</p>
//           <Link to='/post/1' className='px-6 py-1.5 mt-2 bg-orange-400 text-white text-center'>Read more</Link>
//         </Card>
//   )
// }

// export default TopicCard

// ---------version 2-----------
import React from 'react';
import { Card } from 'flowbite-react';
import { FaUser, FaClock, FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PostImage2 from '../../assets/life.jpg';

const TopicCard = ({ image, date, title, desc, category, author }) => {
  return (
    <Card className="max-w-sm overflow-hidden bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img 
          className="w-full h-48 object-cover rounded-t-lg" 
          src={image || PostImage2} 
          alt="Post cover"
        />
        {category && (
          <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <FaClock className="w-3 h-3 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <FaUser className="w-3 h-3 mr-1" />
            <span>{author || 'Galapagous'}</span>
          </div>
        </div>
        <Link to="/post/1" className="block mb-2">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 hover:text-orange-400 transition-colors duration-200">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 text-sm">
          {desc?.split(' ').slice(0, 15).join(' ')} ...
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 flex items-center">
            <FaTag className="w-3 h-3 mr-1" />
            2 min read
          </span>
          <Link
            to="/post/1"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300"
          >
            Read more
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default TopicCard;