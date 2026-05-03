import { Router } from 'express';

import authorizationValidator from '../middlewares/authMiddleware.js';
import verifyProjectMembership from '../middlewares/verifyProjectMembership.js';
import schemaValidation from '../middlewares/validateSchema.js';
import schemaParamValidation from '../middlewares/validateParamsSchema.js';
import jsonReqIsValid from '../middlewares/jsonRequestValid.js';

import {
    createTicketSchema,
    updateTicketSchema,
    changeTicketStateSchema,
    ticketParamsSchema,
    projectParamsSchema
} from '../validators/ticket.schema.js';

import {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    changeTicketState,
    deleteTicket
} from '../controllers/ticket.controller.js';

const ticketRouter = Router({ mergeParams: true }); // mergeParams para acceder al projectId del router padre

// todas las rutas de tickets estan protegidas por auth + membership del proyecto
ticketRouter.use(authorizationValidator);
ticketRouter.use(schemaParamValidation(projectParamsSchema)); // valida que projectId sea numero valido
ticketRouter.use(verifyProjectMembership); // valida que el usuario sea miembro del proyecto

ticketRouter.get('/', getTickets); // GET /projects/:projectId/tickets

ticketRouter.get('/:ticketId', schemaParamValidation(ticketParamsSchema), getTicketById); // GET /projects/:projectId/tickets/:ticketId

ticketRouter.post('/', jsonReqIsValid, schemaValidation(createTicketSchema), createTicket); // POST /projects/:projectId/tickets

ticketRouter.put('/:ticketId', jsonReqIsValid, schemaParamValidation(ticketParamsSchema), schemaValidation(updateTicketSchema), updateTicket); // PUT /projects/:projectId/tickets/:ticketId

ticketRouter.patch('/:ticketId/state', jsonReqIsValid, schemaParamValidation(ticketParamsSchema), schemaValidation(changeTicketStateSchema), changeTicketState); // PATCH /projects/:projectId/tickets/:ticketId/state

ticketRouter.delete('/:ticketId', schemaParamValidation(ticketParamsSchema), deleteTicket); // DELETE /projects/:projectId/tickets/:ticketId

export default ticketRouter;

//creo que aqui el router trata de entrar por medio de la ruta inicial del router de projects ... ver que pasa ahi 
