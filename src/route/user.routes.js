import { Router } from "express";
const router = Router();
import { UserLogIn, UserReg } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
// router.route("/register").post(UserReg)
router.route("/register").post(upload.fields([
   { name: "avatar",
    maxCount: 1}
]),UserReg);

// login route
router.route("/login").post(UserLogIn);

export default router