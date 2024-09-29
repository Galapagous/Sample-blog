import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='text-gray-200 sm:px-20 px-4 flex sm:flex-row flex-col items-start justify-start gap-20 bg-gray-900 p-10'>
      <div className='flex sm:flex-row flex-col items-start justify-center gap-20'>
        <div>
          <h2 className='mb-2 font-semibold text-lg bg-gray-950 px-4 py-2 w-fit'>Contact Me</h2>
          <p>mmusamuhammed450@gmail.com</p>
          <p>+2348123280394</p>
        </div>
        <div>
          <h2 className='mb-2 font-semibold text-lg bg-gray-950 px-4 py-2 w-fit'>Explore</h2>
          <p>Home</p>
          <p>Post</p>
          <p>About</p>
        </div>
        <div>
          <h2 className='mb-2 font-semibold text-lg bg-gray-950 px-4 py-2 w-fit'>Location</h2>
          <p>Plot 12b industrial estate ota, ogun state</p>
        </div>
        <div>
          <h2 className='mb-2 font-semibold text-lg bg-gray-950 px-4 py-2 w-fit'>Connect</h2>
          <div className='flex gap-5'>
            <FaFacebook/>
            <FaTwitter/>
            <FaInstagram/>
            <FaWhatsapp/>
          </div>
        </div>
      </div>
      <div className=''>
        <div className=''>
          <span>2024</span>
          <span>Galapagous Design</span>
        </div>
        <div>
          contact Now
        </div>
      </div>
    </div>
  )
}

export default Footer