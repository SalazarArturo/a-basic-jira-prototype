import { Project } from "../models/index.js";
import { AssignedProject } from "../models/index.js";
import { Op } from "sequelize"; //operadores 

async function getUserProjects(userId){
   try {
        const assignedProjects = await AssignedProject.findAll({where: {userId}});

        const assignedProjectsId = assignedProjects.map((p) =>{
            return p.projectId;
        }); //mapeamos a un arreglo en donde solo tengamos los projectId de los proyectos en donde el usuario es colaborador
        
        const colabProjectsResult = await Project.findAll({ //obtenemos los proyectos en donde somos colabs ayudandonos del array de proyectos mapeados y del Op
            where:{
                projectId: {
                    [Op.in]: assignedProjectsId
                }
            }
        });

        const ownerProjectsResult = await Project.findAll({where:{ownerId: userId}}); //tremos proyectos donde somos owner

        return{
            ownerProjects: ownerProjectsResult,
            colabProjects: colabProjectsResult
        }

   } catch (error) {
        throw error;
   }
}

async function createProjectService(projectData){
    try {
        return await Project.create(projectData);
    } catch (error) {
        throw error;
    }
}


export {
    getUserProjects,
    createProjectService
}