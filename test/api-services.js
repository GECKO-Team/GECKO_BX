import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const userService = {
    Url: serviceUrl,


    async createUser(user) {
        try {
            const res = await axios.post(`${this.Url}/api/addUser`, user);
            return res.data;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response.data;
        }
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

    async deleteUser(user) {
        const res = await axios.delete(`${this.Url}/api/users`,  { params: { username: user.username }});
    }

};

export const groupService = {
    Url: serviceUrl,
    
    async createGroup(group) {
        const res = await axios.post(`${this.Url}/api/createGroup`, group);
        return res.data;
    },

};