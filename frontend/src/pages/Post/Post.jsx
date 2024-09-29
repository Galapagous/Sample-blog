// import Header from "../../components/Header/Header"
// import backgroundImage from '../../assets/back1.jpg'
// import { FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa"
// import Footer from "../../components/Footer/Footer"



// function Post() {
//   return (
//     <div className="w-[100%] overflow-hidden">
//       <div style={{backgroundImage:`url(${backgroundImage})`}} className="bg-cover sm:min-h-[100vh] min-h-[60vh] relative transition-all duration-500 ease-in-out after:w-full after:h-full after:bg-black after:absolute after:top-0 after:left-0 after:opacity-60">
//       <Header/>
//       <section className="w-full sm:mt-0 mt-20 sm:min-h-[80vh] text-white relative z-20 flex items-center justify-center flex-col">
//         <h1 className="sm:text-xl text-lg bg-gray-800 px-6 py-2">
//           Psychology
//         </h1>
//         <p className="sm:text-[4rem] text-[2rem]">
//           Never abandone the truth
//         </p>
//         <span className="mt-4">
//           By Muhammed Musa
//         </span>
//       </section>
//       </div>
//       <section className="w-full min-h-100vh flex sm:flex-row flex-col items-start justify-center gap-5 px-5 my-20">
//         <div className="sm:w-1/5 w-full flex items-center gap-2">
//           <span className=" font-semibold w-fit">17 - 08 - 2024</span>
//           <div className="">----------</div>
//           <span className="font-semibold w-fit">4 min</span>
//         </div>
//         <div className="sm:w-4/5 w-full">
//         <p>
//         George Orwell, through his works, particularly in 1984, teaches the profound importance of holding onto the truth in the face of overwhelming pressure. He illustrates how truth can be manipulated and how societies can be led astray when individuals forsake their commitment to reality. Orwell&apos;s message is a powerful reminder that abandoning the truth not only erodes personal integrity but also paves the way for tyranny and oppression. Upholding the truth, even when it is difficult, is essential for maintaining freedom and justice in any society
//         </p>
//         </div>
//       </section>


//       {/* ----Review --- */}
//       <section className="my-10 px-5 mx-auto w-full flex flex-col items-center justify-center">
//         <h1 className="text-xl">Comments</h1>
//         <div className="w-full sm:w-1/2">
//           <form action="">
//               <input className="w-full text-sm mt-2 border-none rounded-sm bg-gray-100" name="nickname" id="nickname" type="text" placeholder="Nickname (optional)"/>
//               <textarea className="w-full text-sm border-none rounded-md bg-gray-100 h-52" name="message" id="messgae" placeholder="your response"></textarea>
//               <button className="px-6 py-2 bg-orange-400 text-white">Send</button>
//           </form>
//         </div>
//       </section>

//       {/* -----comments----- */}
//       <section className="w-full sm:w-1/2 mx-auto px-5">
//         <div >
//         <div className="mx-auto w-full">
//           <div>
//             <div className="flex items-center mb-2 text-sm justify-start gap-3">
//               <FaUser className="bg-orange-300 text-white p-2 rounded-full w-7 h-7"/>
//               <h2 className="font-semibold">Muhammed Musa</h2>
//               <span className="text-xs">. 12min</span>
//             </div>
//             <p className="text-sm">
//               George orwell, he was indeed a great persolity, reminded me of nietche quotes back in the days. i often lisyen to their words when am lost.
//             </p>
//               <div className="flex items-start mt-1 gap-10">
//               <div className="flex items-center justify-center gap-2">
//                 <p className="text-gray-500 font-semibold">4</p>
//                 <FaThumbsUp className="text-sm cursor-pointer text-green-400"/>
//               </div>
//               <div className="flex items-center justify-center gap-2">
//                 <p className="text-gray-500 font-semibold">1</p>
//                 <FaThumbsDown className="text-sm cursor-pointer text-red-400"/>
//               </div>
//               </div>
//           </div>
//         </div>
//         </div>
//       </section>
//       <Footer/>
//     </div>
//   )
// }

// export default Post

// ------ version 2 ----------

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import backgroundImage from '../../assets/back1.jpg';
import { FaThumbsDown, FaThumbsUp, FaUser, FaComment, FaShare } from "react-icons/fa";

function Post() {
  const [comments, setComments] = useState([
    { id: 1, author: 'Muhammed Musa', content: "George Orwell, he was indeed a great personality, reminded me of Nietzsche's quotes back in the days. I often listen to their words when I'm lost.", likes: 4, dislikes: 1, time: '12min' },
  ]);
  const [newComment, setNewComment] = useState({ nickname: '', message: '' });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.message.trim()) {
      setComments([
        {
          id: comments.length + 1,
          author: newComment.nickname || 'Anonymous',
          content: newComment.message,
          likes: 0,
          dislikes: 0,
          time: 'Just now'
        },
        ...comments
      ]);
      setNewComment({ nickname: '', message: '' });
    }
  };

  const handleLike = (id) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleDislike = (id) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, dislikes: comment.dislikes + 1 } : comment
    ));
  };

  return (
    <div className="w-full overflow-hidden bg-gray-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{backgroundImage:`url(${backgroundImage})`}}
        className="bg-cover sm:min-h-[100vh] min-h-[60vh] relative after:w-full after:h-full after:bg-black after:absolute after:top-0 after:left-0 after:opacity-60"
      >
        <Header/>
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full sm:mt-0 mt-20 sm:min-h-[80vh] text-white relative z-20 flex items-center justify-center flex-col"
        >
          <h1 className="sm:text-xl text-lg bg-gray-800 px-6 py-2 rounded-full mb-4">
            Psychology
          </h1>
          <p className="sm:text-[4rem] text-[2rem] text-center font-bold mb-4">
            Never abandon the truth
          </p>
          <span className="mt-4 text-lg">
            By Muhammed Musa
          </span>
        </motion.section>
      </motion.div>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="max-w-4xl mx-auto px-5 my-20"
      >
        <div className="flex justify-between items-center mb-8 text-gray-600">
          <div className="flex items-center gap-4">
            <span className="font-semibold">17 - 08 - 2024</span>
            <span className="font-semibold">4 min read</span>
          </div>
          <div className="flex gap-4">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center gap-2">
              <FaComment /> 1
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center gap-2">
              <FaShare /> Share
            </motion.button>
          </div>
        </div>
        <p className="text-lg leading-relaxed">
          George Orwell, through his works, particularly in 1984, teaches the profound importance of holding onto the truth in the face of overwhelming pressure. He illustrates how truth can be manipulated and how societies can be led astray when individuals forsake their commitment to reality. Orwell's message is a powerful reminder that abandoning the truth not only erodes personal integrity but also paves the way for tyranny and oppression. Upholding the truth, even when it is difficult, is essential for maintaining freedom and justice in any society.
        </p>
      </motion.section>

      <motion.section 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="my-10 px-5 mx-auto max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <input 
            className="w-full text-sm mt-2 border rounded-md p-2 mb-2"
            name="nickname"
            value={newComment.nickname}
            onChange={(e) => setNewComment({...newComment, nickname: e.target.value})}
            type="text"
            placeholder="Nickname (optional)"
          />
          <textarea 
            className="w-full text-sm border rounded-md p-2 mb-2 h-32"
            name="message"
            value={newComment.message}
            onChange={(e) => setNewComment({...newComment, message: e.target.value})}
            placeholder="Your response"
            required
          ></textarea>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
            type="submit"
          >
            Post Comment
          </motion.button>
        </form>

        {comments.map((comment) => (
          <motion.div 
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center mb-2 text-sm justify-start gap-3">
              <FaUser className="bg-orange-300 text-white p-2 rounded-full w-7 h-7"/>
              <h3 className="font-semibold">{comment.author}</h3>
              <span className="text-xs text-gray-500">• {comment.time}</span>
            </div>
            <p className="text-sm mb-3">{comment.content}</p>
            <div className="flex items-start gap-6">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLike(comment.id)}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-gray-500 font-semibold">{comment.likes}</span>
                <FaThumbsUp className="text-sm cursor-pointer text-green-400"/>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDislike(comment.id)}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-gray-500 font-semibold">{comment.dislikes}</span>
                <FaThumbsDown className="text-sm cursor-pointer text-red-400"/>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.section>
      <Footer/>
    </div>
  );
}

export default Post;