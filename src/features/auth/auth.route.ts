import { Router } from "express";
import { loginSchema } from "./auth.schema";
import { asyncWrapper } from "../../middlewares/asyncWrapper";
import { validateRequest } from "../../middlewares/zodValidate";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", asyncWrapper(authController.login))

export default router; 