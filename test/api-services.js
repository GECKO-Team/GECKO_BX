import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const userService = {
    Url: serviceUrl,


    async createUser(user) {
        const res = await axios.post(`${this.Url}/api/addUser`, user);
        return res.data;
    },



};