// contains all the api calls related to user
import db from "../models/db.js";

export  const userApi = {
    getAllUsers : {
        // returns a test message to assure the api is working
        handler: async function (request, h) {
            let query = "SELECT * FROM USERS";
            const data = await db.getData(query);
            return data.rows;
            return {    message: "API is working" };
        },
        tags: ["api"],
        description: "Test Endpoint",
        notes: "Returns a simple String",
    },

}

