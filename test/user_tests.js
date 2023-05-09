import {assert} from 'chai';
import {test_user} from './fixtures.js';
import {userService} from './api-services.js';


suite('User tests', function() {

    test('Test user creation', async function() {
        // adds user and checks if the response is equal to the user, that should have been added
        const response = await userService.createUser(test_user);
        assert.equal(response.username, test_user.username);
    })




});