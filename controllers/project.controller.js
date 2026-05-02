import { getUserProjects, createProjectService } from "../services/project.service.js";
import { addColabProjectMember, getProjectMember } from "../services/assignedProject.service.js";

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

export{
    getProjects,
    createProject,
    addProjectMember
}