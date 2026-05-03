import { Ticket } from '../models/index.js';
import { AssignedProject, User, Project } from '../models/index.js';

// transiciones de estado permitidas
const allowedTransitions = {
    pendiente: ['progreso'],
    progreso: ['pendiente', 'completado'],
    completado: ['progreso']
};

async function getTicketsByProjectService(projectId) {
    try {
        const tickets = await Ticket.findAll({ where: { projectId } });
        return tickets;

    } catch (error) {
        throw error;
    }
}

async function getTicketByIdService(ticketId, projectId) { // 1ER ISSUE: aqui se puede dar mas detalles haciendo un join con users y projects
    try {
        const ticket = await Ticket.findOne({ where: { ticketId, projectId } });
        if(!ticket) return null;

        const getAssignedUser = await User.findOne({where: {userId: ticket.assignedUserId}});

        const currentProject = await Project.findOne({where:{projectId: ticket.projectId}});

        return {
            ticket,
            assignedUser: getAssignedUser,
            project: currentProject
        }

    } catch (error) {
        throw error;
    }
}

async function createTicketService(ticketData) { 
    // ticketData: { projectId, title, description, assignedUserId }
    try {
        // validamos que el usuario asignado sea miembro del proyecto
        const isMember = await AssignedProject.findOne({
            where: {
                projectId: ticketData.projectId,
                userId: ticketData.assignedUserId
            }
        });

        if (!isMember) {
            const error = new Error('El usuario asignado no pertenece a este proyecto');
            error.statusCode = 400;
            throw error;
        }

        const newTicket = await Ticket.create({
            ...ticketData,
            state: 'pendiente' // siempre arranca en pendiente
        });

        return newTicket;
    } catch (error) {
        throw error;
    }
}

async function updateTicketService(ticketId, projectId, updateData) {
   
    try {
        const ticket = await Ticket.findOne({ where: { ticketId, projectId } });

        if (!ticket) {
            const error = new Error('Ticket no encontrado');
            error.statusCode = 404;
            throw error;
        }

        // si se quiere cambiar el assignedUserId validamos que sea miembro del proyecto
        if (updateData.assignedUserId) {
            const isMember = await AssignedProject.findOne({
                where: {
                    projectId,
                    userId: updateData.assignedUserId
                }
            });

            if (!isMember) {
                const error = new Error('El usuario asignado no pertenece a este proyecto');
                error.statusCode = 400;
                throw error;
            }
        }

        await ticket.update(updateData);
        return ticket;
    } catch (error) {
        throw error;
    }
}

async function changeTicketStateService(ticketId, projectId, newState) {
    try {
        const ticket = await Ticket.findOne({ where: { ticketId, projectId } });

        if (!ticket) {
            const error = new Error('Ticket no encontrado');
            error.statusCode = 404;
            throw error;
        }

        // regla: no se puede pasar a "progreso" sin tener un responsable asignado
        if (newState === 'progreso' && !ticket.assignedUserId) {
            const error = new Error('No se puede iniciar un ticket sin responsable asignado');
            error.statusCode = 400;
            throw error;
        }

        // validamos que la transicion de estado sea permitida
        const validNextStates = allowedTransitions[ticket.state];
        if (!validNextStates.includes(newState)) {
            const error = new Error(`No se puede pasar de "${ticket.state}" a "${newState}"`);
            error.statusCode = 400;
            throw error;
        }

        await ticket.update({ state: newState });
        return ticket;
    } catch (error) {
        throw error;
    }
}

async function deleteTicketService(ticketId, projectId) {
    try {
        const ticket = await Ticket.findOne({ where: { ticketId, projectId } });

        if (!ticket) {
            const error = new Error('Ticket no encontrado');
            error.statusCode = 404;
            throw error;
        }

        await ticket.destroy();
        return true;
    } catch (error) {
        throw error;
    }
}

export {
    getTicketsByProjectService,
    getTicketByIdService,
    createTicketService,
    updateTicketService,
    changeTicketStateService,
    deleteTicketService
};
