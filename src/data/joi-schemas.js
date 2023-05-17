import Joi from "joi";

export const CreateUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const getUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    id: Joi.number().required(),
    photo: Joi.optional(),
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const checkUsernameSchema = Joi.object({
    username: Joi.string().required()
});

