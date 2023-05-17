import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const dbConfig = {
    connectionString: process.env.db_con_string,

};

const dbClient = new pg.Client(dbConfig);
await dbClient.connect();

async function submitData_just_query(query) {
    try {
        await dbClient.query(query);
        return true;
    } catch (dbError) {
        console.error(dbError);
        return false;
    }
}

async function submitData(query, values) {
    try {
        const res = await dbClient.query(query, values);
        return res.rows[0];
    } catch (dbError) {
        console.error(dbError);
        return false;
    }
}

async function getData(my_query, values) {
    try {
        const result = await dbClient.query(my_query, values);
        return result;
    } catch (dbError) {
        console.error(dbError);
        return null;
    }
}


async function getData_old(my_query) {
    try {
        const result = await dbClient.query(my_query);
        return result;
    } catch (dbError) {
        console.error(dbError);
        return null;
    }
}

export { getData, submitData};
