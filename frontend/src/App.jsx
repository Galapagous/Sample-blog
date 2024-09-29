import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn/Signin.pages'
import SignOut from './pages/SignUp/SignUp.pages'
import Posts from './pages/Posts/Posts'
import CreatePost from './pages/CreateBlog/CreatePost'
import Profile from './pages/Profile/Profile'
import Post from './pages/Post/Post'
import Homepages from './pages/Home/Home.pages'
import About from './pages/About/About'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    const fetchDetails = async () => {
      const token = window.sessionStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
            {}, 
            {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          if(response.data && response.data.id){
            console.log('we need to get user profile')
          }
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      }
    }
    fetchDetails()
  }, [])


    const router = createBrowserRouter([
      {
        path: "/profile/:userId",
        element: <Profile/>
      },
      {
        path: "/create",
        element: <CreatePost/>
      },
      {
        path: "/posts",
        element: <Posts/>
      },
      {
        path: "/post/:id",
        element: <Post/>
      },
  {
    path: "/",
    element: <Homepages/>
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/signin",
    element: <SignIn/>
  },
  {
    path: "/signup",
    element: <SignOut/>
  }
])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
