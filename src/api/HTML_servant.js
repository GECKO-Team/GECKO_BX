
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

