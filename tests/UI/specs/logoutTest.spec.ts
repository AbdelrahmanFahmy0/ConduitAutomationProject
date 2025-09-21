import { test } from '../fixtures/pageFixture';

//====================Tests======================
test.describe('Logout Tests', () => {

    test('Check if user can logout successfully TC', { tag: ['@smoke', '@regression'] }, async ({ homePage, settingsPage }) => {
        await homePage.open('/');
        await homePage.navigateToSettings();
        await settingsPage.clickOnLogoutBtn();
        await homePage.assertSuccessfulLogout();
    });
});