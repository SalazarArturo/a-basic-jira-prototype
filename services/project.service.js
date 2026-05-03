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

async function getProjectByIdService(userId, projectId){
    //tengo que obtener un proyecto de la tabla proyectos pero la forma de validarlo es si en primera instancia soy el dueño o si soy colaborador del proyecto que quiero traer
    try {
        
        const project = await Project.findByPk(projectId);

        if(!project) return null;

        if(project.ownerId === userId){ 
            return project;
        }

        
        const isCollaborator = await AssignedProject.findOne({
            where:{
                projectId,
                userId
            }
        });

        if(!isCollaborator) return null;

        return project;

    } catch (error) {
        throw error
    }
}

async function updateProjectService(projectId, userId, updateData){ //corregir los permisos para editar y usar esto en el router de proyectos
    try {
        // solo el owner puede editar el proyecto XXXX cualquier usuario miembro de un proyecto puede editar el proyecto(suena mal lo se pero asi esta el enunciado xd)

        const project = await Project.findOne({ where: {projectId}}); //primero verificamos que el proyecto exista

        if (!project) return null; //si no existe null

        if(project.ownerId === userId){

            await project.update(updateData);
            return project;
        }

        const isCollaborator = await AssignedProject.findOne({
            where:{
                projectId,
                userId
            }
        });

        if(!isCollaborator) return null;

        await project.update(updateData);
        return project;

    } catch (error) {
        throw error;
    }
}

export {
    getUserProjects,
    createProjectService,
    updateProjectService,
    getProjectByIdService
}