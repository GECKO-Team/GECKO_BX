import {assert} from 'chai';
import {test_group} from './fixtures.js';
import {groupService} from './api-services.js';

suite('Group tests', function() {

    test('Test group creation', async function() {
        // adds group and checks if the response is equal to the group, that should have been added
        const response = await groupService.createGroup(test_group);
        console.log(response);
        assert.equal(response.name, test_group.name);
    })


});