import prisma from "../DB/db.config.js"
import { generateUniqueid, imagevaliditor } from "../utils/helper.js"


class ProfileController {
    static async index(req, res) {
        try {
            const user = req.user
            return res.status(200).json({ user })
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" })
        }

    }
    

    static async update(req, res) {
        try {
            const { id } = req.params
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ message: "Profile image is required" })
            }

            const profile = req.files.profile
            const message = imagevaliditor(profile?.size, profile?.mimetype)
            if (message === null) {
                const imgExt = profile?.name.split(".")
                const imageName = generateUniqueid() + "." + imgExt[1]
                const uploadPath = process.cwd() + "/public/images/" + imageName
                profile.mv(uploadPath, (err) => {
                    if (err) throw err
                })
                const user = await prisma.users.update({
                    data: {
                        profile: imageName
                    },
                    where: {
                        id: Number(id)
                    }
                })
                return res.status(200).json({ message: "Profile updated successfully", user:user})
            }

            return res.status(400).json({ message: message })
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong"  , error:error})
        }

    }
}

export default ProfileController