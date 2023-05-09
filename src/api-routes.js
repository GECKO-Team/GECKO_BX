
import test from "./api/testendpoint.js";
import {userApi} from "./api/user_api.js";
import {html_servant} from "./api/HTML_servant.js";
import {html} from "mocha/lib/reporters/index.js";

export const apiRoutes = [


    {method: "POST", path: "/api/addUser", config: userApi.createUser},
    {method: "GET", path: "/", config: html_servant.welcome},

    // more to follow

]