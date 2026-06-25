import { Router } from "express"
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)

userRouter.route("/logout").post(verifyJWT, logoutUser)

userRouter.route("/current-user").get(verifyJWT, getCurrentUser)
export {userRouter}