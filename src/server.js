import Hapi from "@hapi/hapi";
import { apiRoutes } from "./api-routes.js";


const swaggerOptions = {
    info: {
        title: "KONTROL API",
        version: "0.1",
    },
};

async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        routes: {cors: true},

    });

    // eslint-disable-next-line no-shadow
    const swaggerOptions = {
        info: {
            title: "KONTROL API",
            version: "0.1"
        },
    };



    server.route( apiRoutes );


    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init();