import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { RegisterPage } from './../pages/registerPage';
import { LoginPage } from '../pages/loginPage';
import { SettingsPage } from '../pages/settingsPage';
import { ManageArticlePage } from './../pages/manageArticlePage';
import { ArticlePage } from '../pages/articlePage';
import { ProfilePage } from './../pages/profilePage';

// Declare the types fixtures.
type MyFixtures = {
    homePage: HomePage,
    registerPage: RegisterPage,
    loginPage: LoginPage,
    settingsPage: SettingsPage,
    manageArticlePage: ManageArticlePage,
    articlePage: ArticlePage,
    profilePage: ProfilePage
};

// Extend the base test by providing the fixtures created above.
export const test = base.extend<MyFixtures>({
    // Initialize the HomePage object before each test and make it available via the 'homePage' fixture.
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    settingsPage: async ({ page }, use) => {
        await use(new SettingsPage(page));
    },

    manageArticlePage: async ({ page }, use) => {
        await use(new ManageArticlePage(page));
    },

    articlePage: async ({ page }, use) => {
        await use(new ArticlePage(page));
    },

    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    }
});

// Export 'expect' and 'request' to use them in test files.
export { expect } from '@playwright/test';