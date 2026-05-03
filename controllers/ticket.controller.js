import {
    getTicketsByProjectService,
    getTicketByIdService,
    createTicketService,
    updateTicketService,
    changeTicketStateService,
    deleteTicketService
} from '../services/ticket.service.js';

async function getTickets(req, res) {
    const { projectId } = req.params;

    try {
        const tickets = await getTicketsByProjectService(parseInt(projectId));
        return res.status(200).json({ tickets });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'error interno, intente nuevamente' });
    }
}

async function getTicketById(req, res) {
    const { projectId, ticketId } = req.params;

    try {
        const ticketDetails = await getTicketByIdService(parseInt(ticketId), parseInt(projectId));

        if (!ticketDetails) {
            return res.status(404).json({ error: 'Ticket no encontrado' });
        }


        return res.status(200).json(ticketDetails);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'error interno, intente nuevamente' });
    }
}

async function createTicket(req, res) {
    const { projectId } = req.params;
    const { title, description, assignedUserId } = req.body;

    try {
        const newTicket = await createTicketService({
            projectId: parseInt(projectId),
            title,
            description,
            assignedUserId
        });

        return res.status(201).json({ message: 'Ticket creado correctamente !'});
    } catch (error) {
        console.error(error.message);
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message });
    }
}

async function updateTicket(req, res) {
    const { projectId, ticketId } = req.params;
    const updateData = req.body;

    try {
        const updatedTicket = await updateTicketService(
            parseInt(ticketId),
            parseInt(projectId),
            updateData
        );

        return res.status(200).json({ message: 'Ticket actualizado correctamente !'});
    } catch (error) {
        console.error(error.message);
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message });
    }
}

async function changeTicketState(req, res) {
    const { projectId, ticketId } = req.params;
    const { state } = req.body;

    try {
        const updatedTicket = await changeTicketStateService(
            parseInt(ticketId),
            parseInt(projectId),
            state
        );

        return res.status(200).json({ message: 'Estado del ticket actualizado !'});
    } catch (error) {
        console.error(error.message);
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message });
    }
}

async function deleteTicket(req, res) {
    const { projectId, ticketId } = req.params;

    try {
        await deleteTicketService(parseInt(ticketId), parseInt(projectId));
        return res.status(200).json({ message: 'Ticket eliminado correctamente !' });
    } catch (error) {
        console.error(error.message);
        const status = error.statusCode || 500;
        return res.status(status).json({ error: error.message });
    }
}

export {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    changeTicketState,
    deleteTicket
};
