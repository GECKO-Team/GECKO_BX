// contains all the api calls related to user
import Boom from "@hapi/boom";
import {getData, submitData} from '../data/db.js';
import {User_service} from "../data/user_service.js";
import {CreateUserSchema, getUserSchema} from "../data/joi-schemas.js";
import {log, validationError} from "./logger.js";
import Joi from "joi";

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

    }

}

