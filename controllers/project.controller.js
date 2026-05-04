import { getUserProjects, createProjectService, getProjectByIdService, updateProjectService } from "../services/project.service.js";
import { addColabProjectMember, getProjectMember, removeColabProjectMemberService } from "../services/assignedProject.service.js";
import { getProjectMembersService, getAllUsersService } from "../services/user.service.js";

async function getProjects(req, res){
    const {userId} = req.user;
  
    try {
        const result = await getUserProjects(userId);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'error interno, intente nuevamente'});
    }
}

async function createProject(req, res){

    const {userId} = req.user;
    const ownerId = userId;
    const {name, description} = req.body;

    try {
        const newProject = await createProjectService({name, description, ownerId});
        await addColabProjectMember({projectId: newProject.projectId, userId: userId})//cada vez que se cree un proyecto tambien deberiamos automaticamente hacernos miembros

        return res.status(201).json({message: 'Proyecto registrado correctamente !'});    
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'error interno, intente nuevamente'});
    }
}

async function getProjectById(req, res){

    const {projectId} = req.params;
    const {userId} = req.user;

    try {
        const projectDetails = await getProjectByIdService(userId, parseInt(projectId));

        if(!projectDetails){
            return res.status(400).json({error: 'no tienes permisos para acceder a este proyecto'});
        }

        const projectMembers = await getProjectMembersService(parseInt(projectId));
        
        return res.status(200).json({
            projectDetails,
            projectMembers
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: "error interno, intente nuevamente"});
    }

}

async function addProjectMember(req, res){
    const {projectId, memberId} = req.params;

    try {
        //primero verificamos que el miembro que se quiere agregar no sea ya un miembro del proyecto en cuestion
        const existingColaborator = await getProjectMember(parseInt(projectId), parseInt(memberId));
        if(existingColaborator){
            return res.status(400).json({message: 'El usuario ya es colaborador de este proyecto'});
        }

        //entonces agregamos el usuario al proyecto
        await addColabProjectMember({projectId: parseInt(projectId), userId: parseInt(memberId)});

        return res.status(200).json({message: 'Miembro agregado exitosamente'});

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'error interno, intente nuevamente'});
    }
}

async function updateProject(req, res){ //aqui se usara el servicio para actualizar un proyecto

    const {userId} = req.user;
    const {projectId} = req.params;

    try {
        const result = await updateProjectService(parseInt(projectId), userId, req.body);
        if(!result){
            return res.status(400).json({error: 'No tiene tiene permisos para editar este proyecto'});
        }
        return res.status(200).json({message: 'Proyecto actualizado con exito !'});

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'error interno, intente nuevamente'});
    }
}

async function removeProjectMember(req, res){
    
    const {projectId, memberId} = req.params;

    try {
        const result = await removeColabProjectMemberService(parseInt(projectId), parseInt(memberId));

        if(!result){
            return res.status(400).json({message: 'No tiene permisos para remover al miembro o el proyecto no existe'});
        }
        return res.status(200).json({message: 'Miembro removido con exito'});

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'error interno, intente nuevamente'});
    }
}

async function getAllUsers(req, res){
    try {
        const result = await getAllUsersService();
        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: 'error interno, intente nuevamente'});
    }
}

export{
    getProjects,
    createProject,
    getProjectById,
    addProjectMember,
    updateProject,
    removeProjectMember,
    getAllUsers
}