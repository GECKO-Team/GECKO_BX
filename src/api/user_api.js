// contains all the api calls related to user
import Boom from "@hapi/boom";
import { getData, submitData } from '../data/db.js';
import { User_service } from "../data/user_service.js";
import { CreateUserSchema, getUserSchema, checkUsernameSchema, updateUserSchema, userInformationSchema } from "../data/joi-schemas.js";
import { log, validationError } from "./logger.js";
import Joi from "joi";
import { createToken } from "./jwt_utils.js";

const saltRounds = 10;


export const userApi = {
    getAllUsers: {
        // returns a test message to assure the api is working
        handler: async function (request, h) {
            let query = "SELECT * FROM USERS";
            const data = await getData(query);
            return h.response(data.rows).code(200);
        },
        tags: ["api"],
        description: "Test Endpoint",
        notes: "Returns a simple String",
    },

    createUser: {
        auth: false,
        handler: async function (request, h) {
            /*
            INPUT SHOULD LOOK LIKE - validation not implemented yet // TODO
            {
                "username": "test",
                "email": "...",
                "password": "test"
            }

             */
            log("Trying to add new user to database: " + request.payload.username);
            // check if username exists
            if (await User_service.checkUsername_exists(request.payload.username)) {
                throw Boom.badRequest("Username already exists");
            }

            const user = await User_service.createUser(request.payload);
            return h.response(user).code(200);

        },
        tags: ["api"],
        description: "Creation of a a user",
        notes: "Returns a simple String",
        validate: {
            payload: CreateUserSchema,
            failAction: validationError
        },
        response: {
            schema: getUserSchema,
            failAction: validationError
        }

    },

    checkUsername_exists: {
        // returns false, when username exists, true when it does not
        auth: false,
        handler: async function (request, h) {
            if (await User_service.checkUsername_exists(request.payload.username)) {
                //Boom.badRequest("Username already exists"); -> boom not testable with chai?
                return h.response({ success: false, error: "Username already exists" }).code(400);
            }
            return h.response({ success: true }).code(200);
        },
        tags: ["api"],
        description: "Check if username already exists",
        notes: "Returns true if the name exists, otherwise false",
        validate: {
            payload: checkUsernameSchema,
            failAction: validationError
        }
    },

    authenticate: {
        auth: false,
        handler: async function (request, h) {
            try {
                console.log(request.payload)
                const user = await User_service.getUser_by_Email(request.payload.email);
                if (user === null) {
                    return Boom.unauthorized("User not found");
                }

                // compare the password

                if (await User_service.checkPassword(request.payload.email, request.payload.password) === false) {
                    return Boom.unauthorized("Invalid password");
                }

                const token = createToken(user);

                return h.response({ success: true, token: token, username: user.username }).code(201);

            } catch (err) {
                // eslint-disable-next-line no-template-curly-in-string
                console.log(`DEBUG: authenticate API - ${err}`)
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Authenticate  a User",
        notes: "If user has valid email/password, create and return a JWT token",
        // validate: { payload: UserCredentialsSpec, failAction: validationError },
        // response: { schema: JwtAuth, failAction: validationError },

    },

    getUser: {
        auth: false,
        handler: async function (request, h) {

            const username = request.params.username;
            log("Searching for the user by username: " + username);

            // check if username exists
            if (await User_service.checkUsername_exists(username) == false) {
                throw Boom.badRequest("User with this username '" + username + "' was not found");
            }
            // get user data
            const user = await User_service.getUser_by_Username(username);

            // get interests for user
            const interests = await User_service.getUserInterests(user.id);
            console.dir(interests);
            console.dir(user);

            return h.response({ username: user.username, password: user.password, email: user.email, id: user.id, photo: user.photo, interest: interests }).code(200);

        },
        tags: ["api"],
        description: "Get a user by username",
        notes: "Returns a user details",
        validate: {
            params: Joi.object({
                username: Joi.string()
            })
        },
        response: {
            schema: userInformationSchema,
            failAction: validationError
        }

    },

    deleteUser: {
        auth: false,
        handler: async function (request, h) {
            console.log(request.params.username)
            log("Trying to delete user from database: " + request.params.username);
            const username = request.params.username;
            // check if username exists
            if (await User_service.checkUsername_exists(username) == false) {
                throw Boom.badRequest("User with this username '" + username + "' was not found");
            }
            const user = await User_service.deleteUserbyUsername(username);
            let responsemessage = "User with username '" + username + "' was deleted";
            return h.response(responsemessage).code(200);

        },
        tags: ["api"],
        description: "Delete a user by username",
        notes: "Returns a user details",
    },

    updateUser: {
        auth: false,
        handler: async function (request, h) {
            /*
            INPUT SHOULD LOOK LIKE - validation not implemented yet // TODO
            {
                "username": 1,
                "email": "...",
                "photo": "/{username}_profile"
            }

             */
            log("Trying to update user to database: " + request.payload.username);

            const event = await User_service.updateUser(request.params.id, request.payload);

            if(request.payload.interests){
                const event = await User_service.updateInterest(request.params.id, request.payload.interests)
            }

            if (event) {
                return h.response(event).code(200);
            }
            return h.response().code(404);

        },
        tags: ["api"],
        description: "Update a user",
        notes: "Returns new user",
        validate: {
            params: Joi.object({
                id: Joi.number()
            }),
            payload: updateUserSchema,
            failAction: validationError
        }

    },

}