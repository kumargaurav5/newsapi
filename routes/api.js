import { Router } from "express";
import AuthController from "../controllers/AuthControllers.js";
import authMiddleware from "../middleware/Authenticate.js";
import ProfileController from "../controllers/ProfileController.js";
import NewController from "../controllers/NewsController.js";
import redisCache from "../DB/redis.config.js";

const router = Router()
//* Auth Routes

router.post("/auth/register" , AuthController.register)
router.post("/auth/login" , AuthController.login)
router.get("/send-email" , AuthController.sendTestEmail)

//* Profile Routes
router.get("/profile" , authMiddleware , ProfileController.index)
router.post("/profile/:id" , authMiddleware , ProfileController.update)

//news Routes 
router.get("/news" ,redisCache.route(),  NewController.index)
router.post("/news" ,authMiddleware,  NewController.store)
router.get("/news/:id" , NewController.show)
router.put("/news/:id" ,authMiddleware, NewController.update)
router.delete("/news/:id" ,authMiddleware, NewController.destroy)


export default router