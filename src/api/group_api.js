import Boom from "@hapi/boom";
import {submitData} from '../data/db.js';
import {Group_service} from "../data/group_service.js";
import {CreateGroupSchema, GetAllGroups, GetGroupSchema} from "../data/joi-schemas.js";
import {log, validationError} from "./logger.js";

export  const groupAPI = {
    
    createGroup : {
        auth: false,
        handler: async function (request, h) {

            log("Trying to add new group to database: " + request.payload.name);
            const group = await Group_service.createGroup(request.payload);

            log("Trying to add an the user as admin to the group: " + request.payload.name + " " + request.payload.username);
            const admin = await Group_service.addGroupAdmin(group, request.payload.username);
            return h.response(group, admin).code(200);

        },
        tags: ["api"],
        description: "Creation of a group",
        notes: "Returns a simple String",
        validate: {
            payload: CreateGroupSchema,
            failAction: validationError
        },
        response: {
            schema: GetGroupSchema,
            failAction: validationError
        }
    },

    getAllGroups: {
        auth: false,
        handler: async function (request, h) {
            let groups = await Group_service.getAllGroups();
            groups = groups.rows;
            return h.response(groups).code(200);
        },
        tags: ["api"],
        description: "Get all groups",
        notes: "Returns an array of groups",
        response: {
            schema: GetAllGroups,
            failAction: validationError
        }
    },

    getGroupbyID: {
        auth: false,
        handler: async function (request, h) {
            let group = await Group_service.getGroupById(request.params.id);
            group = group.rows[0];
            if (group.rowCount === 0) {
                return Boom.notFound("No group found with this ID");
            }
            return h.response(group).code(200);
        },
        tags: ["api"],
        description: "Get a group by its ID",
        notes: "Returns a group",
        response: {
            schema: GetGroupSchema,
            failAction: validationError
        }
    }

}