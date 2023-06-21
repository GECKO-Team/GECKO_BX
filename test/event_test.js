import { assert } from 'chai';
import { test_event, not_exist_event } from './fixtures.js';
import { eventService } from './api-services.js';


suite('Event tests', function () {

    test('Test event creation', async function () {
        const response = await eventService.createEvent(test_event);
        assert.equal(response.data.title, test_event.title);
    }),

        test('Get an existing event by title', async function () {
            const response = await eventService.getEvent_by_Title(test_event.title);
            console.log(response.status);
            assert.equal(response.status, 200);
            response.data.forEach(element => {
                assert.equal(element.title, test_event.title);
            });

        }),

        test('Get an non existing event by title', async function () {
            const response = await eventService.getEvent_by_Title(not_exist_event.title);
            console.log(response);
            assert.equal(response.status, 404);

        }),

        test('Get an existing event by id', async function () {
            const responseTitle = await eventService.getEvent_by_Title(test_event.title);
            responseTitle.data.forEach(async element => {
                const response = await eventService.getEvent_by_Id(element.id);
                console.log(response);
                assert.equal(response.data.title, test_event.title);
            });
        }),

        test('Get an non existing event by id', async function () {
                const response = await eventService.getEvent_by_Id(not_exist_event.id);
                console.log(response);
                assert.equal(response.status, 404);
        }),

        test('Get an existing event by date', async function () {
            const response = await eventService.getEvent_by_Date(Date.parse(test_event.time) - 1, Date.parse(test_event.time) + 1);
            console.log(response);
            assert.equal(response.status, 200);
            assert.equal(response.data[0].title, test_event.title);
        }),

        test('Get an non existing event by date', async function () {
            const response = await eventService.getEvent_by_Date(Date.parse("9999-12-17 07:37:16.000"), Date.parse("9999-12-18 07:37:16.000"));
            console.log(response);
            assert.equal(response.status, 404);
        }),

        test('Change an existing event', async function () {
            let test_event_changed = test_event;
            test_event_changed.city = "Changed";
            const responseTitle = await eventService.getEvent_by_Title(test_event.title);
            console.log(responseTitle);
            const response = await eventService.changeEvent(responseTitle.data[0].id, test_event_changed);
            console.log(response.data);
            assert.equal(response.data.city, test_event_changed.city);
        }),

        test('Change an non existing event', async function () {
            let test_event_changed = test_event;
            test_event_changed.city = "Changed";
            const response = await eventService.changeEvent(not_exist_event.id, test_event_changed);
            console.log(response);
            assert.equal(response.status, 404);
        }),

        test('Delete a user', async function (event) {
            this.timeout(5000);
            const responseTitle = await eventService.getEvent_by_Title(test_event.title);
            console.log(responseTitle.data);
            const response = await eventService.deleteEvent(responseTitle.data[0].id);
            console.log(response)
            assert.equal(response.status, 200);
        }),

        test('Delete an non existing user', async function (event) {
            this.timeout(5000);
            const response = await eventService.deleteEvent(not_exist_event.id);
            console.log(response)
            assert.equal(response.status, 404);
        })
});