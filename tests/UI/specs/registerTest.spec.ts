import { test } from '../fixtures/pageFixture';
import usersData from '../../../test-data/authData.json';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

//===================Variables===================
const userData = JSON.parse(JSON.stringify(usersData));
const username = userData.username + Date.now();
const email = userData.username + userData.email;
const password = userData.password;

//===================Hooks=======================
test.beforeEach(async ({ homePage }) => {
    await homePage.open('/');
    await homePage.navigateToRegister();
});

//====================Tests======================
test.describe('Register Tests', { tag: '@regression' }, () => {

    test('Register with valid data TC', { tag: '@smoke' }, async ({ homePage, registerPage }) => {
        await registerPage.enterUsername(username);
        await registerPage.enterEmail(username + userData.email);
        await registerPage.enterPassword(password);
        await registerPage.clickRegister();
        await homePage.assertSuccessfulRegister(username);
    });

    test('Register with empty fields TC', async ({ registerPage }) => {
        await registerPage.assertRegisterBtnIsDisabled();
    });

    test('Register with empty username TC', async ({ registerPage }) => {
        await registerPage.enterEmail(email);
        await registerPage.enterPassword(password);
        await registerPage.assertRegisterBtnIsDisabled();
    });

    test('Register with empty email TC', async ({ registerPage }) => {
        await registerPage.enterUsername(userData.username);
        await registerPage.enterPassword(password);
        await registerPage.assertRegisterBtnIsDisabled();
    });

    test('Register with empty password TC', async ({ registerPage }) => {
        await registerPage.enterUsername(userData.username);
        await registerPage.enterEmail(email);
        await registerPage.assertRegisterBtnIsDisabled();
    });

    test('Register with long username TC', async ({ registerPage }) => {
        await registerPage.enterUsername('username' + Date.now());
        await registerPage.enterEmail(email);
        await registerPage.enterPassword(password);
        await registerPage.clickRegister();
        await registerPage.assertErrorMessage(userData.messages.longUsername);
    });

    test('Register with short username TC', async ({ registerPage }) => {
        await registerPage.enterUsername('u');
        await registerPage.enterEmail(email);
        await registerPage.enterPassword(password);
        await registerPage.clickRegister();
        await registerPage.assertErrorMessage(userData.messages.shortUsername);
    });

    test('Regiter with existing username TC', { tag: '@smoke' }, async ({ registerPage }) => {
        await registerPage.enterUsername(userData.existingUsername);
        await registerPage.enterEmail(email);
        await registerPage.enterPassword(password);
        await registerPage.clickRegister();
        await registerPage.assertErrorMessage(userData.messages.existingUsername);
    });

    test('Register with existing email TC', { tag: '@smoke' }, async ({ registerPage }) => {
        await registerPage.enterUsername(userData.username);
        await registerPage.enterEmail(userData.existingUsername + "@yahoo.com");
        await registerPage.enterPassword(password);
        await registerPage.clickRegister();
        await registerPage.assertErrorMessage(userData.messages.existingEmail);
    });

    test('Register with invalid email format TC', async ({ registerPage }) => {
        await registerPage.enterUsername(userData.username);
        await registerPage.enterEmail(userData.username);
        await registerPage.enterPassword(password);
        await registerPage.clickRegister();
        await registerPage.assertErrorMessage(userData.messages.invalidEmail);
    });

    test('Register with short password TC', async ({ registerPage }) => {
        await registerPage.enterUsername(userData.username);
        await registerPage.enterEmail(email);
        await registerPage.enterPassword('pass');
        await registerPage.clickRegister();
        await registerPage.assertErrorMessage(userData.messages.shortPassword);
    });
});