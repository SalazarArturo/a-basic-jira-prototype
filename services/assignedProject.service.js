import { AssignedProject, Project} from "../models/index.js";

async function getProjectMember(projectId, userId){
    try {
        const result = await AssignedProject.findOne({
            where: {
                projectId,
                userId
            } 
        });
        
        return result;
    } catch (error) {
        throw error;
    }
}

async function addColabProjectMember(assignedProjectData){
    try {

        return await AssignedProject.create(assignedProjectData);
    } catch (error) {
        throw error;
    }
}

async function removeColabProjectMemberService(projectId, userId){
    
    try {
      const currentProject = await Project.findByPk(projectId);

      if(!currentProject) return null;

      const existingCollab = await AssignedProject.findOne({where:{
        projectId,
        userId
      }});

      if(!existingCollab) return null;

      if(currentProject.ownerId === userId){
         return await AssignedProject.destroy({where:{
                projectId,
                userId
            }});
      }

       return await AssignedProject.destroy({where:{
                projectId,
                userId
            }});
     
    } catch (error) {
        throw error;
    }
}

export{
    addColabProjectMember,
    getProjectMember,
    removeColabProjectMemberService
}