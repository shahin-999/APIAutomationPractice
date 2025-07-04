import { test, expect } from '@playwright/test'
import { buffer } from 'stream/consumers';

const bURL = 'https://reqres.in/api'


test('GET API test', async ({ request }) => {

    const response1 = await request.get(bURL + '/users/2');
    console.log(await response1.json())
    expect(response1.status()).toBe(200);

    const response2 = await request.get(`${bURL}/users?page=2`);
    console.log(`respose 2 = ${await response2.text()}`);
    expect(response2.status()).toBe(200);
})

test('POSR api request', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
        data:
        {
            "name": "r",
            "job": "leader"
        }
    });
    console.log(response.status());
    console.log(await response.json());

})

test('the testing world api', async ({ request }) => {
    //const a = await request.get('https://thetestingworldapi.com/api/studentsDetails')
    //console.log(await a.json());

    const b = await request.post('https://thetestingworldapi.com/api/studentsDetails', {
        data: {
            "first_name": "sample string 2",
            "middle_name": "sample string 3",
            "last_name": "sample string 4",
            "date_of_birth": "sample string 5"
        }
    });
    const responseJSON = await b.json();
    console.log(responseJSON);
    const postID = await responseJSON.id;

    const postResponse = await request.get(`https://thetestingworldapi.com/api/studentsDetails/${postID}`);

    console.log(await postResponse.json());
})