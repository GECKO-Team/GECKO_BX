import {assert} from 'chai';
import {test_event} from './fixtures.js';
import {eventService} from './api-services.js';


suite('Event tests', function() {


    test('Test event creation', async function() {
        // adds user and checks if the response is equal to the user, that should have been added
        const response = await eventService.createEvent(test_event);
        assert.equal(response.title, test_event.title);
    })

    test('Check if username exists', async function(){
        const response1 = await userService.checkUsername_exists(test_user);
        assert.equal(response1.success. true)
        const response2 = await userService.checkUSername_exists(no_user);
        assert.equal(response2.statusCode, 400)
    })


});