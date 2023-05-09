import {getData} from '../data/db.js';

export  const testEndpoint = {
    apitest : {
        // returns a test message to assure the api is working
        handler: async function (request, h) {
            return {    message: "API is working" };
        },
        tags: ["api"],
        description: "Test Endpoint",
        notes: "Returns a simple String",
    },

}

export default testEndpoint;

