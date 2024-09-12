import { ZodError } from "zod"
import { newSchema } from "../validations/newsValidation.js"
import { errorFomatter, generateUniqueid, imagevaliditor, removeImage, uploadImage } from "../utils/helper.js"
import prisma from "../DB/db.config.js"
import NewsApiTransform from "../transform/newsApiTransform.js"

class NewController {
    static async index(req, res) {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15
        if (page <= 0) {
            page = 1
        }

        if (limit <= 0 || limit > 15) {
            limit = 15
        }

        const skip = (page - 1) * limit

        const news = await prisma.news.findMany({
            take: limit,
            skip: skip,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        profile: true
                    }
                }
            }
        })
        const newsTransform = news?.map((item) => {
            return NewsApiTransform.transform(item)
        })

        const totalNews = await prisma.news.count()
        const totalPages = Math.ceil(totalNews / limit)

        return res.status(200).json({
            news: newsTransform, metadata: {
                totalNews: totalNews,
                totalPages: totalPages,
                currentLimit: limit

            }
        })

    }

    static async store(req, res) {
        try {
            const user = req.user
            const body = req.body
            const payload = newSchema.parse(body)
            if (!req.files || Object.keys(req.files).length == 0) {
                return res.status(400).json({ message: "News image is required" })
            }

            const image = req.files?.image
            const message = imagevaliditor(image?.size, image?.mimetype)
            if (message !== null) {
                return res.status(400).json({ message: message })
            }

            const imageName = uploadImage(image)

            payload.image = imageName
            payload.user_id = user.id

            const news = await prisma.news.create({
                data: payload
            })


            return res.json({ message: "News created successfully", news })
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = errorFomatter(error)
                return res.status(422).json({ message: errors })
            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        }

    }

    static async show(req, res) {
        try {
            const { id } = req.params
            const news = await prisma.news.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            profile: true
                        }
                    }
                }
            })
            res.json({ news: news ? NewsApiTransform.transform(news) : "No news in given id" })

        } catch (error) {
            res.status(404).json({ message: "Something went wrong" })
        }


    }

    static async update(req, res) {

        try {
            const { id } = req.params
            const user = req.user;
            const body = req.body
            const news = await prisma.news.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (user.id !== news.user_id) {
                return res.status(400).json({ message: "Unauthorized to edit this news" })
            }

            const payload = newSchema.parse(body)


            const image = req?.files?.image
            let imageName;

            if (image) {
                const message = imagevaliditor(image?.size, image?.mimetype)
                if (message !== null) {
                    return res.status(400).json({ message: message })
                }

                imageName = uploadImage(image)
                removeImage(news.image)
                payload.image = imageName
            }

            const updatednews = await prisma.news.update({
                data: payload,
                where: {
                    id: Number(id)
                }
            })

            return res.status(200).json({ updatednews: updatednews })

        } catch (error) {
            if (error instanceof ZodError) {
                const errors = errorFomatter(error)
                return res.status(422).json({ message: errors })
            } else {
                return res.status(500).json({ message: "Something went wrong" })
            }
        }

    }

    static async destroy(req, res) {
        try {
            const { id } = req.params
            const user = req.user
            const news = await prisma.news.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if(!news){
                return res.status(404).json({ message: "news already deleted" })
            }

            if (user.id !== news?.user_id) {
                return res.status(401).json({ message: "unauthorized to delete this news" })
            }
            removeImage(news.image)
            console.log("image deleted")
            const deletednews = await prisma.news.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json({ deletednews: deletednews })
        } catch (error) {
            return res.status(500).json({ error: "Something went wrong" })
        }
    }
}

export default NewController