// import jwt from 'jsonwebtoken';
// import { v4 as uuidv4 } from 'uuid';
// import bcrypt from 'bcryptjs';
// import redisClient from '../utils/redis.js';

// class AuthController {
//   // JWT secret key and expiration times
//   JWT_SECRET = process.env.JWT_SECRET;
//   ACCESS_TOKEN_EXPIRATION = '15m';
//   REFRESH_TOKEN_EXPIRATION = '7d';

//   generateTokens(userId) {
//     const accessToken = jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: this.ACCESS_TOKEN_EXPIRATION });
//     const refreshToken = uuidv4();
//     return { accessToken, refreshToken };
//   }

//   async login(req, res) {
//     try {
//       const { email, password } = req.body;
      
//       // Verify user credentials (implement your own logic)
//       const user = await UserService.findByEmail(email);
//       if (!user || !bcrypt.compareSync(password, user.password)) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }

//       const { accessToken, refreshToken } = this.generateTokens(user.id);

//       // Store refresh token and session data in Redis
//       const sessionId = uuidv4();
//       await redisClient.multi()
//         .set(`refresh_token:${refreshToken}`, user.id)
//         .set(`session:${sessionId}`, JSON.stringify({ userId: user.id, email: user.email }))
//         .expire(`refresh_token:${refreshToken}`, 7 * 24 * 60 * 60) // 7 days
//         .expire(`session:${sessionId}`, 7 * 24 * 60 * 60) // 7 days
//         .exec();

//       // Set HTTP-only cookie with refresh token
//       res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

//       res.json({ accessToken, sessionId });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async refresh(req, res) {
//     try {
//       const { refreshToken } = req.cookies;
//       const userId = await redisClient.get(`refresh_token:${refreshToken}`);

//       if (!userId) {
//         return res.status(401).json({ error: 'Invalid refresh token' });
//       }

//       const { accessToken, refreshToken: newRefreshToken } = this.generateTokens(userId);

//       // Update refresh token in Redis
//       await redisClient.multi()
//         .del(`refresh_token:${refreshToken}`)
//         .set(`refresh_token:${newRefreshToken}`, userId)
//         .expire(`refresh_token:${newRefreshToken}`, 7 * 24 * 60 * 60)
//         .exec();

//       // Set new refresh token in HTTP-only cookie
//       res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

//       res.json({ accessToken });
//     } catch (error) {
//       console.error('Refresh error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async logout(req, res) {
//     try {
//       const { refreshToken } = req.cookies;
//       const accessToken = req.headers.authorization?.split(' ')[1];

//       // Remove refresh token from Redis
//       await redisClient.del(`refresh_token:${refreshToken}`);

//       // Add access token to blacklist
//       if (accessToken) {
//         const decoded = jwt.decode(accessToken);
//         if (decoded && decoded.exp) {
//           const ttl = decoded.exp - Math.floor(Date.now() / 1000);
//           await redisClient.set(`blacklist:${accessToken}`, 'true', 'EX', ttl);
//         }
//       }

//       // Clear refresh token cookie
//       res.clearCookie('refreshToken');

//       res.json({ message: 'Logged out successfully' });
//     } catch (error) {
//       console.error('Logout error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// }

// export default new AuthController();


// --------- middleware ----------------
// import jwt from 'jsonwebtoken';
// import redisClient from '../utils/redis.js';

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }

//     // Check if token is blacklisted
//     const isBlacklisted = await redisClient.get(`blacklist:${token}`);
//     if (isBlacklisted) {
//       return res.status(401).json({ error: 'Token is no longer valid' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     if (error instanceof jwt.TokenExpiredError) {
//       return res.status(401).json({ error: 'Token expired' });
//     }
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// };
// --------- middleware ----------------


// ------- version 2 -----------
import bcrypt from "bcryptjs"
import AuthService from "../services/authService.js"
import ProfileService from "../services/profileService.js"
import jwt from 'jsonwebtoken'
import { redisClient } from "../../../server.js"

class AuthController {
  signin = async (req, res) => {
    try {
      const authHeader = req.headers.authorization

      if (authHeader && authHeader.startsWith('Bearer ')) {
        return this.getAuthTokenId(req, res)
      } else {
        const data = await this.handleSignIn(req, res)
        return res.json(data)
      }
    } catch (error) {
      console.error('Error in signin:', error)
      res.status(500).json({ error: error.message || 'An error occurred during sign in' })
    }
  }

  signup = async (req, res) => {
    const userData = req.body

    if (!userData.username || !userData.email || !userData.password) {
      return res.status(400).json('Kindly provide all necessary data')
    }

    try {
      const hashedPassword = this.hashPassword(userData.password)
      const updatedUserData = { ...userData, password: hashedPassword }
      const newUser = await AuthService.signupUser(updatedUserData)
      const { password, ...userWithoutPassword } = newUser
      res.status(200).json(userWithoutPassword)
    } catch (error) {
      res.status(401).json(error.message || 'Error during signup')
      console.error(error)
    }
  }

  signout = (req, res) => {
    res.json({ message: "Signed out successfully" })
  }

  hashPassword = (password) => {
    const salt = Number(process.env.SALT_ROUND) || 10
    return bcrypt.hashSync(password, salt)
  }

  setToken = async (key, value) => {
    await redisClient.set(key, value)
    return true
  }

  createSession = async (userData) => {
    const { email, _id } = userData
    const token = this.generateToken(email)
    await this.setToken(token, _id)
    return { success: true, userId: _id, token }
  }

  generateToken = (email) => {
    const payload = { email }
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '2 days' })
  }

  getAuthTokenId = async (req, res) => {
    const { authorization } = req.headers
    try {
      const result = await redisClient.get(authorization)
      if (!result) {
        console.log('i ran in token gen')
        return res.status(401).json('Unauthorized')
      }
      return res.status(200).json({ id: result })
    } catch (error) {
      console.error('Error getting auth token:', error)
      return res.status(500).json('Internal server error')
    }
  }

  handleSignIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      throw new Error('Some credentials are missing')
    }

    const userExist = await ProfileService.getProfile({ email })

    if (!userExist || userExist.length === 0) {
      throw new Error('Invalid credentials')
    }

    const validPassword = await bcrypt.compare(password, userExist[0].password)
    if (!validPassword) {
      throw new Error('Invalid credentials')
    }

    return this.createSession(userExist[0])
  }
}

export default new AuthController()