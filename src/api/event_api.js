// contains all the api calls related to user
import Boom from "@hapi/boom";
import { getData, submitData } from '../data/db.js';
import { event_service } from "../data/event_service.js";
import { createEventSchema } from "../data/joi-schemas.js";
import { log, validationError } from "./logger.js";
import Joi from "joi";
import { createToken } from "./jwt_utils.js";


export const eventApi = {

    createEvent: {
        auth: false,
        handler: async function (request, h) {
            /*
            INPUT SHOULD LOOK LIKE - validation not implemented yet // TODO
            {
                "group_id": 1,
                "title": "...",
                "time": "test",
                "country": "Test",
                "city": "Test",
                "street": "sadf",
                "house_nr": "123",
                "description" "..."
            }

             */
            log("Trying to add new event to database: " + request.payload.title);

            const event = await event_service.createEvent(request.payload);
            return h.response(event).code(200);

        },
        tags: ["api"],
        description: "Creation of a a event",
        notes: "Returns a simple String",
        validate: {
            payload: createEventSchema,
            failAction: validationError
        }

    },

    updateEvent: {
        auth: false,
        handler: async function (request, h) {
            /*
            INPUT SHOULD LOOK LIKE - validation not implemented yet // TODO
            {
                "group_id": 1,
                "title": "...",
                "time": "test",
                "country": "Test",
                "city": "Test",
                "street": "sadf",
                "house_nr": "123",
                "description" "..."
            }

             */
            log("Trying to update event to database: " + request.payload.title);

            const event = await event_service.updateEvent(request.params.id, request.payload);
            if (event) {
                return h.response(event).code(200);
            }
            return h.response().code(404);

        },
        tags: ["api"],
        description: "Update a event",
        notes: "Returns new event",
        validate: {
            params: Joi.object({
                id: Joi.number()
            }),
            payload: createEventSchema,
            failAction: validationError
        }

    },

    deleteEvent: {
        auth: false,
        // returns a test message to assure the api is working
        handler: async function (request, h) {
            const data = await event_service.deleteEvent(request.params.id);
            if (data) {
                return h.response().code(200);
            }
            return h.response().code(404);
        },
        tags: ["api"],
        description: "Delete a event",
        notes: "Returns a status code",
        validate: {
            params: Joi.object({
                id: Joi.number()
            })
        }
    },

    getEvent: {
        auth: false,
        // returns a test message to assure the api is working
        handler: async function (request, h) {
            const data = await event_service.getEvent_by_Id(request.params.id);

            if (data) {
                return h.response(data).code(200);
            }
            return h.response().code(404);
        },
        tags: ["api"],
        description: "Search for a specific event",
        notes: "Returns the event if found",
        validate: {
            params: Joi.object({
                id: Joi.number()
            })
        }
    },

    getEvents: {
        auth: false,
        handler: async function (request, h) {

            let data = null;
            if (request.query.title) {
                data = await event_service.getEvent_by_title(request.query.title);
            }
            else if (request.query.before && request.query.after) {
                data = await event_service.getEvent_between_time(request.query.after, request.query.before);
            }
            else if (request.query.country && request.query.city && request.query.street && request.query.housenr) {
                data = await event_service.getEvent_at_place(request.query.country, request.query.city, request.query.street, request.query.housenr);
            }
            else {
                data = await event_service.getEvent_all();
            }

            if (data.rows && data.rowCount > 0) {
                return h.response(data.rows).code(200);
            }

            return h.response().code(404);
        },
        tags: ["api"],
        description: "Search for events with title or time or place",
        notes: "Returns the events",
        validate: {
            query: Joi.object({
                title: Joi.string(),
                before: Joi.date(),
                after: Joi.date(),
                country: Joi.string(),
                city: Joi.string(),
                street: Joi.string(),
                housenr: Joi.string()
            })
        }
    },

}

