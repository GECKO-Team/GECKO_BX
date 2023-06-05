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
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const checkUsernameSchema = Joi.object({
    username: Joi.string().required()
});

export const createEventSchema = Joi.object({
    group_id: Joi.number().required(),
    title: Joi.string().required(),
    time: Joi.date().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    house_nr: Joi.string().required(),
    description: Joi.string()
});
export const CreateGroupSchema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required()
});

export const GetGroupSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    id: Joi.number().required()
});
