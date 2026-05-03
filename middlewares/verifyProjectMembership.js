import { getProjectMember } from '../services/assignedProject.service.js';

async function verifyProjectMembership(req, res, next) {
    const { userId } = req.user;
    const { projectId } = req.params;

    try {
        const isMember = await getProjectMember(parseInt(projectId), userId);

        if (!isMember) {
            return res.status(403).json({ error: 'No tenes acceso a este proyecto' });
        }

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'error interno, intente nuevamente' });
    }
}

export default verifyProjectMembership;
