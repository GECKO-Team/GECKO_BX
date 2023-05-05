
import test from "./api/testendpoint.js";

export const apiRoutes = [

    // test-endpoint
    { method: "GET", path: "/api/test", config: test.apitest },
    { method: "GET", path: "/api/testdb", config: test.testdb },


    // more to follow

]