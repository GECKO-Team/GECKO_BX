import Hapi from "@hapi/hapi";
import { apiRoutes } from "./api-routes.js";
import HapiSwagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";


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

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);



    server.route( apiRoutes );


    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init();