import Joi from 'joi';

const createTicketSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().max(300).required(),
    assignedUserId: Joi.number().integer().positive().required()
});

const updateTicketSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().max(300),
    assignedUserId: Joi.number().integer().positive()
}).min(1); // al menos un campo tiene que venir

const changeTicketStateSchema = Joi.object({
    state: Joi.string().valid('pendiente', 'progreso', 'completado').required()
});

const ticketParamsSchema = Joi.object({
    projectId: Joi.number().integer().positive().required(),
    ticketId: Joi.number().integer().positive().required()
});

const projectParamsSchema = Joi.object({
    projectId: Joi.number().integer().positive().required()
});

export {
    createTicketSchema,
    updateTicketSchema,
    changeTicketStateSchema,
    ticketParamsSchema,
    projectParamsSchema
};
