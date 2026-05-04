import { Router } from "express";

import authorizationValidator from "../middlewares/authMiddleware.js";
import schemaValidation from "../middlewares/validateSchema.js";
import schemaParamValidation from "../middlewares/validateParamsSchema.js";

import { registerProjectSchema, projectParamsSchema } from "../validators/project.schema.js";
import addProjectMemberParamsSchema from '../validators/projectMemberParams.schema.js';

import { getProjects, createProject, addProjectMember, updateProject, getProjectById, removeProjectMember, getAllUsers } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.get('/', authorizationValidator, getProjects); //aqui ya empiezan las rutas protegidas. Obtener proyectos  (propios y de colab)

projectRouter.get('/users/available', authorizationValidator, getAllUsers); //obtener todos los usuarios disponibles para agregar como colaboradores

projectRouter.post('/', authorizationValidator, schemaValidation(registerProjectSchema), createProject); 

projectRouter.get('/:projectId', authorizationValidator, schemaParamValidation(projectParamsSchema), getProjectById); //ruta por donde pivotearan las demas con respecto a proyectos

projectRouter.put('/:projectId/', authorizationValidator, schemaParamValidation(projectParamsSchema), schemaValidation(registerProjectSchema), updateProject);

//deleteProject ???? 

projectRouter.post('/:projectId/member/:memberId', authorizationValidator, schemaParamValidation(addProjectMemberParamsSchema), addProjectMember);

projectRouter.delete('/:projectId/member/:memberId', authorizationValidator, schemaParamValidation(addProjectMemberParamsSchema), removeProjectMember);


export default projectRouter;