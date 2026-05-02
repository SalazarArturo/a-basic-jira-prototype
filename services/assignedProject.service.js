import { AssignedProject } from "../models/index.js";

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

export{
    addColabProjectMember,
    getProjectMember
}