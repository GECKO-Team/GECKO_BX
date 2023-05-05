import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const dbConfig = {
    connectionString: process.env.db_con_string,

};

const dbClient = new pg.Client(dbConfig);
await dbClient.connect();

async function submitData(query) {
    try {
        await dbClient.query(query);
        return true;
    } catch (dbError) {
        console.error(dbError);
        return false;
    }
}

async function getData(my_query) {
    try {
        const result = await dbClient.query(my_query);
        return result;
    } catch (dbError) {
        console.error(dbError);
        return null;
    }
}

export { getData, submitData };
