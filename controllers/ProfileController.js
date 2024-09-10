import { imagevaliditor } from "../utils/helper.js"


class ProfileController{
    static async index(req,res){
        try{
            const user= req.user
            return res.status(200).json({user})
        }catch(error){
            return res.status(500).json({message:"Something went wrong"})
        }

    }
    static async update(req,res){
        const {id} =req.user
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({message:"Profile image is required"})
        }

        const profile= req.files.profile
        const message=imagevaliditor(profile?.size , profile?.mimetype)
        if(message===null){
            return res.status(400).json({message:message})
        }

    }
}

export default ProfileController