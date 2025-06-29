import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { userSchemaValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router=Router()
router.post("/register" ,validateRequest(userSchemaValidation.userValidation) ,userController.createUser)
router.get("/my-profile",auth(USER_ROLE.admin, USER_ROLE.user),userController.getMyProfileIntoDB)
router.get("/:id",userController.getUserById)
router.post("/update",auth(USER_ROLE.admin, USER_ROLE.user) ,userController.updateUserFromDB)


export const userRouter = router;