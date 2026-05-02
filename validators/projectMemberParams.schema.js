import Joi from "joi";

const addMemberParamsSchema = Joi.object({
    projectId: Joi.number().integer().positive().required(),
    memberId: Joi.number().integer().positive().required()
});

export default addMemberParamsSchema;