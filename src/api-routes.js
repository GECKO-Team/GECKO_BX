
import test from "./api/testendpoint.js";
import {userApi} from "./api/user_api.js";
import {html_servant} from "./api/HTML_servant.js";
import {html} from "mocha/lib/reporters/index.js";

export const apiRoutes = [

    // WELCOME PAGE
    {method: "GET", path: "/", config: html_servant.welcome},
    // CAUTION: "/documentation" is reserved by hapi-swagger


    // API ENDPOINTS
    {method: "POST", path: "/api/addUser", config: userApi.createUser},
    {method: "POST", path: "/api/authenticate", config: userApi.authenticate},

    // more to follow

]