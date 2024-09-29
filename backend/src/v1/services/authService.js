import UserProfile from "../model/profileModel.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'



class AuthService{

    signupUser = async (userData) => {
        try {
            const createdUser = UserProfile.create(userData)
            return createdUser
        } catch (error) {
            console.error(error);
        }
}


signinUser = async (userData, next) => {
    const { username, password} = userData;
    if(!username ||!password) {
        throw new Error("All fields are required");
    }
    try{
        const user = await UserProfile.findOne({ username: userData.username }).exec();
        if(!user) throw new Error("User not found");
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword) throw new Error("Invalid password");
        const secret = process.env.JWT_SECRET || 'MARIAM';
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1d' });
        res.cookie('access_token', token, { expiresIn: '1d', httpOnly: true, maxAge: 86400000 })
        .json({ message: 'Logged in successfully', user: user });
    }catch(error){
        console.error(error);
        next(error);
    }
}


signoutUser = async (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'strict',
    });
}


}


export default new AuthService