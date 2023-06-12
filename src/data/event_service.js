import { getData, submitData } from '../data/db.js';
import { createEventSchema } from './joi-schemas.js';

export const event_service = {


    async createEvent(event) {

        let query = "INSERT INTO events (group_id, title, time, country, city, street, house_nr, description, creator) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
        const created_event = await submitData(query, [event.group_id, event.title, event.time, event.country, event.city, event.street, event.house_nr, event.description, event.creator]);

        return created_event;
    },

    async getEvent_by_Id(id) {
        // this function returns the event for the given id
        // returns null if event does not exist
        let query = "SELECT * FROM events WHERE id = $1";
        const event = await getData(query, [id]);
        if (event.rowCount > 0) {
            return event.rows[0];
        } else {
            return null;
        }
    },

    async getEvent_by_title(title) {
        let query = "SELECT * FROM events WHERE title = $1";
        const event = await getData(query, [title]);
        return event;
    },

    async getEvent_between_time(time_after, time_before) {
        let query = "SELECT * FROM events WHERE time BETWEEN $1 and $2";
        const event = await getData(query, [time_before, time_after]);
        return event;
    },

    async getEvent_at_place(country, city, street, house_nr) {
        let query = "SELECT * FROM events WHERE country = $1 AND city = $2 AND street = $3 AND house_nr = $4";
        const event = await getData(query, [country, city, street, house_nr]);
        return event;
    },

    async getEvent_all() {
        let query = "SELECT * FROM events";
        const event = await getData(query);
        return event;
    },

    async updateEvent(id, event) {
        let query = "UPDATE events SET group_id = $1, title = $2, time = $3, country = $4, city = $5, street = $6, house_nr = $7, description = $8 WHERE id = $9 RETURNING *";
        const result = submitData(query, [event.group_id, event.title, event.time, event.country, event.city, event.street, event.house_nr, event.description, id]);

        return result;
    },

    async deleteEvent(id) {
        let query = "DELETE FROM events WHERE id = $1";
        const result = submitData(query, [id]);

        return result;
    }
}