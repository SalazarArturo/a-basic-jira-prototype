import Joi from "joi";

const registerProjectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().max(100).required()
});

export{
    registerProjectSchema
}