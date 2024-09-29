import UserProfile from './profileModel'

export const signUpUser = (userData)=>{
    const signUpUser = new UserProfile(userData)
    const savedUser = signUpUser.save()
    return savedUser
}

