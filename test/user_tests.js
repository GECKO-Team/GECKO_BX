import {assert} from 'chai';
import {test_user} from './fixtures.js';
import {no_user} from './fixtures.js';
import {userService} from './api-services.js';


suite('User tests', function() {


    test('Test user creation', async function() {
        // adds user and checks if the response is equal to the user, that should have been added
        const response = await userService.createUser(test_user);
        assert.equal(response.username, test_user.username);
    })

    test('User authentication', async function() {
        const response = await userService.authenticate(test_user);
        assert.equal(response.success, true);

    })

    test('Check if username exists', async function(){
        const response1 = await userService.checkUsername_exists(test_user);
        assert.equal(response1.success. true)
        const response2 = await userService.checkUSername_exists(no_user);
        assert.equal(response2.statusCode, 400)
    })


});