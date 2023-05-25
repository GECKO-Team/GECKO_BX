import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const userService = {
    Url: serviceUrl,


    async createUser(user) {
        const res = await axios.post(`${this.Url}/api/addUser`, user);
        console.log(res)
        return res.data;
    },

    async authenticate(user) {
        const res = await axios.post(`${this.Url}/api/authenticate`, user);
        return res.data;
    },

    async checkUsername_exists(user) {
        const res = await axios.post(`${this.Url}/api/checkUsername_exists`, user);
        return res.data;
    },

    async getUser(user) {
    const res = await axios.get(`${this.Url}/api/user/{username}`, user);  //TODO: Not sure if it works 
    console.log(res)
    return res.data;
},

};