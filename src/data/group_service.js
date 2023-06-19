import {getData, submitData} from '../data/db.js';

export const Group_service = {

    async createGroup(group) {
        // this function creates a group in the database and returns the group object

        let query = "INSERT INTO GROUPS (name, description) VALUES ($1, $2) RETURNING *";
        const created_group = await submitData(query, [group.name, group.description]);
        return created_group;
    },

    async addGroupAdmin(created_group, username) {
        // this function adds an admin to a created group
        let query1 = "SELECT * FROM USERS WHERE username = $1";
        let query2 = "INSERT INTO GROUPS_ADMINS (group_id, admin_id) VALUES ($1, $2)";
        const userid = await getData(query1, [username]);
        const group_admin = await submitData(query2, [created_group.id, userid.rows[0].id]);
        return group_admin;
    },

    async getAllGroups() {
        let query = "SELECT * FROM GROUPS";
        const groups = await getData(query);
        return groups;
    },

    async getGroupById(id) {
        let query = "SELECT * FROM GROUPS WHERE id = $1";
        const group = await getData(query, [id]);
        return group;
    }

}