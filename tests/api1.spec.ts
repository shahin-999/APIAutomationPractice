import { test, expect, request as playwrightRequest } from '@playwright/test';

const REPO = 'java';
const USER = 'shahin-999';

test('Test 1', async({request, baseURL})=>{
    const testEndPoint = `${baseURL}/repos/${USER}/${REPO}/issues`;
    console.log(testEndPoint);
    const newIssue = await request.post(testEndPoint, {
        data:{
            title: '[Bug] Report 1',
            body: 'Bug Description',
        }        
    });
    console.log(`newIssue_Rabby = ${newIssue}`);

    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(testEndPoint);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] report 1',
    body: 'Bug description'
  }));
});