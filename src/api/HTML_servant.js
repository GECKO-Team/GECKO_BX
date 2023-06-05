// contains all the api calls related to user
import Boom from "@hapi/boom";
import {getData, submitData} from '../data/db.js';
import {User_service} from "../data/user_service.js";
import {CreateUserSchema, getUserSchema} from "../data/joi-schemas.js";
import {validationError} from "./logger.js";
import {sample_html} from "../data/main.html.js";
import Joi from "joi";

const saltRounds = 10;


export  const html_servant = {

    welcome : {
        handler: async function (request, h) {
            return sample_html;
        },
        tags: ["api"],
        description: "Simple Welcome Page",
        notes: "Returns a HTML File"

    }

}

