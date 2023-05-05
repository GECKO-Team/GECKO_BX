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

    testdb : {
        // returns all users to assure the api is working
        handler: async function (request, h) {
            let query = "SELECT * FROM USERS";
            const data = await getData(query);
            console.log(data);
            return data;
        }
    }

}

export default testEndpoint;

