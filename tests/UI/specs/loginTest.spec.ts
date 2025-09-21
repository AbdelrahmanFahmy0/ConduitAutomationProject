import { test, expect } from '../fixtures/pageFixture';
import usersData from '../../../test-data/authData.json';
import usersRequest from '../../API/endpoints/usersEndpoint';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

//===================Variables===================
const userData = JSON.parse(JSON.stringify(usersData));
const username = userData.username + Date.now();
const email = username + userData.email;
const password = userData.password;
const errorMessage = userData.messages.invalidLoginCredentials;

//===================Hooks=======================
test.beforeAll(async ({ request }) => {
    //runs once before all tests in the file
    await usersRequest.createUser(request, username, email);
});

test.beforeEach(async ({ homePage }) => {
    //runs before every test in the file
    await homePage.open('/');
    await homePage.navigateToLogin();
});

//====================Tests======================
test.describe('Login Tests', { tag: '@regression' }, () => {

    test('Login with valid data TC', { tag: '@smoke' }, async ({ homePage, loginPage }) => {
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickLogin();
        await homePage.assertSuccessfulLogin(username);
    });

    test('Login with empty data TC', async ({ loginPage }) => {
        await loginPage.assertLoginBtnIsDisabled();
    });

    test('Login with empty email TC', async ({ loginPage }) => {
        await loginPage.enterPassword(password);
        await loginPage.assertLoginBtnIsDisabled();
    });

    test('Login with empty password TC', async ({ loginPage }) => {
        await loginPage.enterEmail(email);
        await loginPage.assertLoginBtnIsDisabled();
    });

    test('Login with invalid password TC', { tag: '@smoke' }, async ({ loginPage }) => {
        await loginPage.enterEmail(userData.existingEmail);
        await loginPage.enterPassword('invalidPassword');
        await loginPage.clickLogin();
        await loginPage.assertErrorMessage(errorMessage);
    });

    test('Login with unregistered email TC', async ({ loginPage }) => {
        await loginPage.enterEmail('user' + Date.now() + '@gmail.com');
        await loginPage.enterPassword(password);
        await loginPage.clickLogin();
        await loginPage.assertErrorMessage(errorMessage);
    });
});