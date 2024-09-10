import { Router } from "express";
import AuthController from "../controllers/AuthControllers.js";
import authMiddleware from "../middleware/Authenticate.js";
import ProfileController from "../controllers/ProfileController.js";

const router = Router()
//* Auth Routes

router.post("/auth/register" , AuthController.register)
router.post("/auth/login" , AuthController.login)

//* Profile Routes
router.get("/profile" , authMiddleware , ProfileController.index)


export default router