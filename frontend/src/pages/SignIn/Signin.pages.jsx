// --------- version 2 -----------
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Signin from "../../assets/signin.jpg"
import axios from 'axios';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';



const SignIn = () => {

  // configurations
  const navigate = useNavigate()



  // variable declarations
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);


  const saveAuthToken = (token)=>{
    window.sessionStorage.setItem('token', token)
  }



  // input change handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, formData, {
        withCredentials:true,
      });
      if(response.data.success === 'true'){
        saveAuthToken(response.data.token)
        navigate('/')
      }else{
        console.log('error ----> ', response)
      }
      // Handle successful sign-in here
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-blue-600 p-8 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-6">Sign in to catch up on the latest updates and insights from our community.</p>
            <img
              src={Signin}
              alt="Community illustration"
              className="rounded-lg shadow-md h-1/2 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    placeholder="you@example.com"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center"
              >
                <LogIn size={18} className="mr-2" />
                Sign In
              </motion.button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account yet?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
            <div className="mt-6">
              <button
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center"
              >
                <img src="/api/placeholder/18/18" alt="Google logo" className="mr-2" />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;


// --------- version 2 all--------------
// // AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem('accessToken');
//       if (token) {
//         try {
//           const response = await axios.get('/api/v1/auth/me', {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           setUser(response.data);
//         } catch (error) {
//           console.error('Error initializing auth:', error);
//           localStorage.removeItem('accessToken');
//         }
//       }
//       setLoading(false);
//     };

//     initAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post('/api/v1/auth/login', { email, password });
//       const { accessToken, user } = response.data;
//       localStorage.setItem('accessToken', accessToken);
//       setUser(user);
//       return user;
//     } catch (error) {
//       console.error('Login error:', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post('/api/v1/auth/logout');
//       localStorage.removeItem('accessToken');
//       setUser(null);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const refreshToken = async () => {
//     try {
//       const response = await axios.post('/api/v1/auth/refresh');
//       const { accessToken } = response.data;
//       localStorage.setItem('accessToken', accessToken);
//       return accessToken;
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       logout();
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, refreshToken, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// // axiosConfig.js
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const { refreshToken } = useAuth();
//         const newAccessToken = await refreshToken();
//         axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         return instance(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;

// // PrivateRoute.js
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = () => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './AuthContext';
// import PrivateRoute from './PrivateRoute';
// import Login from './Login';
// import Dashboard from './Dashboard';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route element={<PrivateRoute />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             {/* Add other private routes here */}
//           </Route>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

// // Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//       // Handle login error (show message to user)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;