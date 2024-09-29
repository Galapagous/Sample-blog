import { Dropdown } from "flowbite-react"
import { useState } from "react"
import { FaGrinHearts, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import {motion} from 'framer-motion'



const Header = () => {

  const [showMenu, setShowMenu] = useState(false)


    const handleMenu = () => {
        setShowMenu(!showMenu)
    }


    return (
        <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full h-auto relative z-50 transition-all duration-500 ease-in-out'
        >
            <div className='w-full h-fit sm:h-auto sm:px-8 px-4 font-medium sm:py-4 py-2 text-[#002147] flex items-center justify-between gap-10 rounded-[2rem]'>
                {/* -----logo section----- */}
              <div className='text-orange-400 font-bold text-[2rem]'>
                <h1>Musa</h1>
              </div>

                <div className={`flex items-center justify-center sm:gap-40`}>
                    <ul className={`items-center flex sm:flex flex-col sm:flex-row absolute sm:relative top-14 h-[100vh] sm:h-auto w-3/4 sm:w-auto  sm:top-auto sm:left-auto bg-[#0b1118] py-10 sm:py-0 -right-full transition-all duration-700 ${showMenu ? 'right-0' : ""} sm:right-auto sm:bg-inherit text-white justify-start sm:gap-10 gap-24`}>
                        <Link to='/'>Home</Link>
                        <Link to='/posts'>Posts</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/create'>Write</Link>
                        <li>
                            <Dropdown label={<FaUser className="h-4 w-4 group-hover:scale-125 group-hover:w-[1.1rem] transition-all duration-200" />}>
                                <Dropdown.Item>
                                <Link to='/profile/1234'>Profile</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                <Link to='/signin'>Signout</Link>
                                </Dropdown.Item>
                            </Dropdown>
                        </li>
                    </ul>
                    
                </div>
                <div onClick={handleMenu} className={`flex flex-col justify-center items-center w-6 h-6 cursor-pointer sm:hidden`}>
                    <div className={`w-6 h-0.5 bg-[white] rounded-sm transition-all duration-300 ease-in-out 
                        ${showMenu ? 'rotate-45 translate-y-0.5' : 'translate-y-[-4px]'}`}></div>
                    <div className={`w-6 h-0.5 bg-[white] rounded-sm transition-all duration-300 ease-in-out 
                        ${showMenu ? 'opacity-0' : 'opacity-100'}`}></div>
                    <div className={`w-6 h-0.5 bg-[white] rounded-sm transition-all duration-300 ease-in-out 
                    ${showMenu ? '-rotate-45 -translate-y-0.5' : 'translate-y-[4px]'}`}></div>
                </div>
            </div>
        </motion.header>
    )
}

export default Header