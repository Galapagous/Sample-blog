import UserProfile from "../model/profileModel.js"

class ProfileService{

    
    
    // createProfile = async (profileData) => {
    //     return UserProfile.create(profileData)
    // }

    getProfile = async (query) => {
        try{
            const user = await UserProfile.find(query)
            return user
        }catch(error){
            console.log(error)
            return error
        }
    }

    updateProfile = async ({id, data}) => {
        return UserProfile.findByIdAndUpdate(id, data)
    }

    deleteProfile = async (id) => {
        const deletedUser = await UserProfile.findByIdAndDelete(id)
        return deletedUser
    }

}


export default new ProfileService
