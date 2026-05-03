import { Router } from "express";

import jsonReqIsValid from "../middlewares/jsonRequestValid.js";
import schemaValidation from "../middlewares/validateSchema.js";

import { loginUserSchema, registerUserSchema } from "../validators/user.schema.js";

import { postLoginCredentials, registerUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/login', jsonReqIsValid, schemaValidation(loginUserSchema), postLoginCredentials); //loginRoute

authRouter.post('/register', jsonReqIsValid, schemaValidation(registerUserSchema), registerUser);

export default authRouter;