
import {getData, submitData} from '../data/db.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const User_service = {


    async createUser(user) {
        // this function creates a user in the database and returns the user object

        const hash = await bcrypt.hash(user.password, saltRounds);

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
        // this function returns the user credentials for the given username
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

    async checkEmail(email) {

    }



}