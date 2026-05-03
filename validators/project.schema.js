import Joi from "joi";

const registerProjectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().max(100).required()
});

const projectParamsSchema = Joi.object({
    projectId: Joi.number().integer().positive().required()
});

export{
    registerProjectSchema,
    projectParamsSchema
}