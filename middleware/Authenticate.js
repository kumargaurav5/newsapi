import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "unauthorized access" })
    }

    try {
        const token = authHeader.split(" ")[1]
        const user = await jwt.verify(token, process.env.JWT_SCERET)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "unauthorized access" })
    }
}

export default authMiddleware