import FileService from "../services/fileService.js"
import ProfileService from "../services/profileService.js"

class ProfileController{
   
    
getProfile = async (req, res) => {
    const query = req.query
    try {
        const profile = await ProfileService.getProfile(query)

        // attach avatar
        let profileData = profile
        if(profile.avatar){
            imageData = FileService.getFileData(profile.avatar)
            profileData = {...profile, avatarURL: imageData}
        }
        res.status(200).json(profileData)
    } catch (error) {
        return res.status(5000).json('Error fetching post')
    }
}


updateProfile = async (req, res) => {
    const profileData = req.body

    // attach filename if it exist
    if(req.file) profileData.avatarURL = req.file.filename

    try {
        const updatedProfile = await ProfileService.updateProfile(profileData)
        res.status(200).json(updatedProfile)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


deleteProfile = async (req, res) => {
 const {id} = req.params
 if(!id) return res.status(400).json('Some details are missing')
 try {
    const deletedProfile = await ProfileService.deleteProfile(id)
    res.status(200).json(deletedProfile)
 } catch (error) {
    
 }
}

 // add more endpoints for other profile functionalities like follow, unfollow, like, unlike, etc.
 
}



export default new ProfileController