// contains all the api calls related to user
import Boom from "@hapi/boom";
import {getData, submitData} from '../data/db.js';
import {User_service} from "../data/user_service.js";
import {CreateUserSchema, getUserSchema, checkUsernameSchema} from "../data/joi-schemas.js";
import {log, validationError} from "./logger.js";
import Joi from "joi";
import {createToken} from "./jwt_utils.js";

const saltRounds = 10;


export  const userApi = {
    getAllUsers : {
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

    createUser : {
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

    checkUsername_exists : {
        auth: false,
        handler: async function (request, h){
            if (await User_service.checkUsername_exists(request.payload.username)) {
                throw Boom.badRequest("Username already exists");
            }
            return h.response({sucess:true}).code(200);
        },
        tags: ["api"],
        description: "Check if username already exists",
        notes: "Returns true if the name exists, otherwise false",
        validate: {
            payload: checkUsernameSchema ,
            failAction: validationError
        }
    },

    authenticate: {
        auth: false,
        handler: async function (request, h) {
            try {
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
                console.log(`DEBUG: authenticate API - ${  err}`)
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Authenticate  a User",
        notes: "If user has valid email/password, create and return a JWT token",
        // validate: { payload: UserCredentialsSpec, failAction: validationError },
        // response: { schema: JwtAuth, failAction: validationError },

    },

}
j