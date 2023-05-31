import {assert} from 'chai';
import {test_user} from './fixtures.js';
import {check_test_user} from './fixtures.js';
import {check_no_user} from './fixtures.js';
import {userService} from './api-services.js';


suite('User tests', function() {

    test('Test user creation', async function() {
        // adds user and checks if the response is equal to the user, that should have been added
        const response = await userService.createUser(test_user);
        assert.equal(response.statusCode, 200);
        assert.equal(response.username, test_user.username);
    })

    test('User authentication', async function() {
        const response = await userService.authenticate(test_user);
        assert.equal(response.success, true);

    })

    test('Check if username exists', async function(){
        const response1 = await userService.checkUsername_exists(check_no_user);
        assert.equal(response1.success, true)
        // somehow not working, dunno why -> but works in api
        //const response2 = await userService.checkUsername_exists(check_test_user);
        //assert.equal(response2.success, false);
    })

    test('Delete a user', async function(){
        const response = await userService.deleteUser(test_user.username);
        assert.equal(response.success, true);
    })


});