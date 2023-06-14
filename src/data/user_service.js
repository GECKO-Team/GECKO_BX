
import {getData, submitData} from '../data/db.js';
import bcrypt from 'bcrypt';
import format from 'pg-format';

const saltRounds = 10;

export const User_service = {


    async createUser(user) {
        // this function creates a user in the database and returns the user object

        const hash = await bcrypt.hash(user.password, saltRounds);

        // check if user exists
        if (await this.checkUsername_exists(user.username)) {
            return {statusCode: 400, message: "Username already exists"};
        }

        let query = "INSERT INTO USERS (username, email, password) VALUES ($1, $2, $3) RETURNING *";
        const created_user = await submitData(query, [user.username, user.email, hash]);

        // eliminate password from response
        delete created_user.password;
        return created_user;
    },

    async checkPassword(email, password) {
        // get user pw
        let query = "SELECT password FROM USERS WHERE email = $1";
        const user = await getData(query, [email]);
        if (user.rowCount > 0) {
            const hash = user.rows[0].password;
            return bcrypt.compare(password, hash);
        }
        else {
            return false;
        }
    },

    async checkUsername_exists(username) {
        // this function checks if a user with the given username exists in the database
        // returns true if user exists, false if not
        let query = "SELECT * FROM USERS WHERE username = $1";
        const user = await getData(query, [username]);
        return user.rowCount > 0;

    },

    async userCredentials(username) {
        // this function returns the user credentials for the given username
        // returns null if user does not exist
        let query = "SELECT * FROM USERS WHERE username = $1";
        const user = await getData(query, [username]);
        if (user.rowCount > 0) {
            return user.rows[0];
        } else {
            return null;
        }
    },

    async getUser_by_Email(email) {
        // this function returns tuser data for the given email
        // returns null if user does not exist
        let query = "SELECT * FROM USERS WHERE email = $1";
        const user = await getData(query, [email]);
        if (user.rowCount > 0) {
            return user.rows[0];
        } else {
            return null;
        }
    },

    async getUser_by_Username(username) {
        // this function returns user data for the given username
        // returns null if user does not exist
        let query = "SELECT * FROM USERS WHERE username = $1";
        const user = await getData(query, [username]);
        if (user.rowCount > 0) {
            return user.rows[0];
        } else {
            return null;
        }
    },

    async getUserInterests(user_id){
        // this function returns all interests for the given username
        // returns null if user does not exist
        let query = "SELECT interest FROM INTERESTS WHERE user_id = $1";
        const interests = await getData(query, [user_id]);
        if (interests.rowCount > 0) {
            return interests.rows.map(row => row.interest);
        } else {
            return null;
        }
    },

    async checkEmail(email) {

    },

    deleteUserbyUsername(username) {
        // this function deletes a user from the database
        let query = "DELETE FROM USERS WHERE username = $1";
        return submitData(query, [username]);
    },

    async updateUser(id, user) {
        let query = "UPDATE users SET username = $1, email = $2, photo = $3 WHERE id = $4 RETURNING *";
        const result = submitData(query, [user.username, user.email, user.photo, id]);

        return result;
    },

    async updateInterest(id, interests) {

        let queryDelete = "DELETE FROM interests WHERE user_id = $1";
        const resultDelete = submitData(query, [id]);


        let queryInsert = "INSERT INTO interests (user_id, interest) VALUES %L";
        const resultInsert = submitData(format(queryInsert, interests), []);

        return result;
    },





}