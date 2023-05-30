
import test from "./api/testendpoint.js";
import {userApi} from "./api/user_api.js";
import {groupAPI} from "./api/group_api.js";
import {eventApi} from "./api/event_api.js";
import {html_servant} from "./api/HTML_servant.js";
import {html} from "mocha/lib/reporters/index.js";

export const apiRoutes = [

    // WELCOME PAGE
    {method: "GET", path: "/", config: html_servant.welcome},
    // CAUTION: "/documentation" is reserved by hapi-swagger


    // API ENDPOINTS
    {method: "POST", path: "/api/addUser", config: userApi.createUser},
    {method: "POST", path: "/api/authenticate", config: userApi.authenticate},
    {method: "POST", path: "/api/checkUsername_exists", config: userApi.checkUsername_exists},
    {method: "GET", path: "/api/users/{username}", config: userApi.getUser},

    // Groups
    {method: "POST", path: "/api/createGroup", config: groupAPI.createGroup},

    // Events
    {method: "POST", path: "/api/events", config: eventApi.createEvent},
    {method: "GET", path: "/api/events/{id}", config: eventApi.getEvent},
    {method: "GET", path: "/api/events", config: eventApi.getEvents},
    {method: "PUT", path: "/api/events/{id}", config: eventApi.updateEvent},
    {method: "DELETE", path: "/api/events/{id}", config: eventApi.deleteEvent},

    // more to follow

]