import styles from './signup.module.css'
import Signup from '../../assets/about.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Spinner } from 'flowbite-react'

function SignUp() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  // updating user information
  const handleFormData = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }



  // sign up user to the backend
  const handleSignUp = async(e)=>{
    e.preventDefault()
    setLoading(true)
    if(!formData.username || !formData.email || !formData.password) return toast.error('All field are required', {
      position:'top-center'
    })
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, formData)
      if(response.status !== 200) return toast.error('Error pls try again', {position: 'top-center'})
      toast.success('sign up success', {position: 'top-center'})
      navigate('/')
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Error signin up', {
        position:'top-center'
      })
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className={styles.signupContainer}>
        <div className={styles.signupWrapper}>
          <div className={styles.signupLeft}>
            <img src={Signup} alt="signin image" />
            <div className={styles.signupText}>
              <h3>Our community</h3>
              <p>Join my community! Sign up to stay updated with my latest posts and be a part of the conversation.</p>
            </div>
          </div>
          <div className={styles.signupRight}>
            <h2>Register</h2>
            <form>
              <div className={styles.formData}>
                <label htmlFor="UserName">Username</label>
                <input onChange={handleFormData} type="text" name='username' placeholder='UserName'/>
              </div>
              <div className={styles.formData}>
                <label htmlFor="email">Email</label>
                <input onChange={handleFormData} type="email" name='email' placeholder='Email'/>
              </div>
              <div className={styles.formData}>
                <label htmlFor="password">Password</label>
                <input onChange={handleFormData} type="password" name='password' placeholder='Password'/>
              </div>
                <button onClick={handleSignUp}>
                  {loading ? <Spinner/> : 'Sign up'}
                </button>
                <span>Don&apos;t have an account yet? <Link to='/signin'>Signin here</Link></span>
                <button>signin with Google</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default SignUp