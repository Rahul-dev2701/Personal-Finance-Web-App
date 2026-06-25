import { Router } from "express"
import { registerUser, loginUser, logoutUser, getCurrentUser, changeProfilePhoto, dltProfilePhoto} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlewares.js";


const userRouter = Router();

userRouter.route("/register").post(registerUser)

userRouter.route("/login").post(loginUser)

userRouter.route("/logout").post(verifyJWT, logoutUser)

userRouter.route("/current-user").get(verifyJWT, getCurrentUser)

userRouter.route("/updatepfp").post(verifyJWT, upload.single("profilePicture"), changeProfilePhoto)

userRouter.route("/dltpfp").post(verifyJWT, dltProfilePhoto)

export {userRouter}