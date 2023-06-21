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
        try{
            const res = await axios.get(`${this.Url}/api/users/${user.username}`);
            return res.data;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response.data;
        }
    },

    async deleteUser(user) {
        try {
            const res = await axios.delete(`${this.Url}/api/users/${user.username}`);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response.data;
        }

    }

};

export const groupService = {
    Url: serviceUrl,
    
    async createGroup(group) {
        const res = await axios.post(`${this.Url}/api/createGroup`, group);
        return res.data;
    },

};

export const eventService = {
    Url: serviceUrl,

    async createEvent(event) {
        try {
            const res = await axios.post(`${this.Url}/api/events`, event);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response;
        }
    },

    async changeEvent(id, event) {
        try {
            const res = await axios.put(`${this.Url}/api/events/${id}`, event);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response;
        }
    },

    async getEvent_by_Title(title) {
        try {
            console.log(title)
            const res = await axios.get(`${this.Url}/api/events?title=${title}`);
            console.log(res);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response;
        }
    },

    async getEvent_by_Date(dateBefore, dateAfter) {
        try {
            const res = await axios.get(`${this.Url}/api/events?before=${dateBefore}&after=${dateAfter}`);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response;
        }
    },

    async getEvent_by_Place(country, city, street, housenr) {
        try {
            const res = await axios.get(`${this.Url}/api/events?country=${country}&city=${city}&street=${street}&housenr=${housenr}`);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response;
        }
    },

    async getEvent_by_Id(id) {
        try {
            const res = await axios.get(`${this.Url}/api/events/${id}`);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response;
        }
    },

    async deleteEvent(id) {
        try {
            const res = await axios.delete(`${this.Url}/api/events/${id}`);
            return res;
        }
        catch (err) {
            console.log(err.response.data)
            return err.response;
        }

    }
};