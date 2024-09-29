import React, { useState } from 'react';
import { Button, Label, Select, Spinner, Textarea, TextInput } from 'flowbite-react';
import { motion } from 'framer-motion';
import AboutCover from '../../assets/aboutbg.jpg';
import Header from '../../components/Header/Header';
import { FaImage, FaUpload } from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreatePost() {
  const [postImage, setPostImage] = useState(null);
  const [postData, setPostData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const fileURL = URL.createObjectURL(file);
    setPostImage(fileURL);
    setPostData({ ...postData, avatar: file.name });
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!postData.title || !postData.content || !postData.avatar) {
      return toast.error('All fields are required', { position: 'top-center' });
    }
    setLoading(true);
    const newFormData = new FormData();
    newFormData.append('title', postData.title);
    newFormData.append('content', postData.content);
    newFormData.append('avatar', postData.avatar);
    newFormData.append('avatarData', imageFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/post`, newFormData, {
        withCredentials: true,
      });
      console.log(response);
      toast.success('Post created successfully!', { position: 'top-center' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to create post. Please try again.', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(${AboutCover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="w-full h-[300px] relative"
      >
        <Header />
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center sm:text-[5rem] text-[3rem] font-thin text-white absolute bottom-10 left-0 right-0"
        >
          Make it inspiring
        </motion.h1>
      </motion.section>

      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mb-10 container mx-auto px-4 py-8"
      >
        <form className="max-w-2xl mx-auto mt-2 flex flex-col items-center justify-center gap-6">
          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Label htmlFor="title" className="text-gray-200 mb-2 font-light text-xl tracking-wide">
              Title
            </Label>
            <TextInput id="title" name="title" onChange={handleChange} className="bg-gray-800 text-white border-gray-700" />
          </motion.div>

          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Label htmlFor="category" className="text-gray-200 mb-2 font-light text-xl tracking-wide">
              Category
            </Label>
            <Select id="category" name="category" onChange={handleChange} className="bg-gray-800 text-white border-gray-700">
              <option value="programming">Programming</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
            </Select>
          </motion.div>

          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Label htmlFor="image" className="text-gray-200 mb-2 font-light text-xl tracking-wide">
              Cover Image
            </Label>
            <div className="w-full h-[200px] mb-2 bg-gray-800 rounded-lg overflow-hidden">
              {postImage ? (
                <img className="h-full w-full object-cover" src={postImage} alt="post avatar" />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <FaImage className="text-gray-600 w-16 h-16" />
                </div>
              )}
            </div>
            <div className="relative">
              <input
                id="image"
                type="file"
                onChange={handleFile}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="flex items-center justify-center w-full px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
              >
                <FaUpload className="mr-2" />
                Choose Image
              </label>
            </div>
          </motion.div>

          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Label htmlFor="content" className="text-gray-200 mb-2 font-light text-xl tracking-wide">
              Post Content
            </Label>
            <Textarea
              id="content"
              name="content"
              onChange={handleChange}
              className="h-[250px] bg-gray-800 text-white border-gray-700"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : 'Create Post'}
            </Button>
          </motion.div>
        </form>
      </motion.section>

      <Footer />
    </div>
  );
}

export default CreatePost;