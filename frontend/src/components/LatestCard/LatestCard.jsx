import React from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LatestCard = ({ title, desc, time, Image }) => {
  return (
    <motion.div 
      className="sm:w-[500px] w-full h-[400px] rounded-lg overflow-hidden shadow-lg relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
        style={{ backgroundImage: `url(${Image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
      
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
        <div>
          <motion.h2 
            className="inline-block bg-gray-400 px-4 py-2 text-lg font-bold shadow-md hover:bg-gray-800 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {title}
          </motion.h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <FaClock className="mr-2" />
            <span>{time}</span>
          </div>
          <p className="text-sm line-clamp-3">
            {desc}
          </p>
          <Link to="/post/1">
            <motion.button 
              className="px-6 py-2 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read more
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestCard;