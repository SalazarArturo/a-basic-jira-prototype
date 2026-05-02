import { Router } from "express";

import authorizationValidator from "../middlewares/authMiddleware.js";
import schemaValidation from "../middlewares/validateSchema.js";
import schemaParamValidation from "../middlewares/validateParamsSchema.js";

import { registerProjectSchema } from "../validators/project.schema.js";
import addProjectMemberParamsSchema from '../validators/projectMemberParams.schema.js';

import { getProjects, createProject, addProjectMember } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.get('/', authorizationValidator, getProjects); //aqui ya empiezan las rutas protegidas. Obtener proyectos  (propios y de colab)
projectRouter.post('/', authorizationValidator, schemaValidation(registerProjectSchema), createProject) //create projects

projectRouter.post('/:projectId/member/:memberId', authorizationValidator, schemaParamValidation(addProjectMemberParamsSchema), addProjectMember);

export default projectRouter;