import { chromium, type FullConfig } from '@playwright/test';
import { PoManager } from '../../UI/pages/poManager';
import usersData from '../../../test-data/authData.json';

//===================Variables===================
const userData = JSON.parse(JSON.stringify(usersData));
const username = 'test' + Date.now();
const email = username + userData.email;
const password = userData.password;

//===================Global Setup=======================
async function globalSetup(config: FullConfig) {
    /* Create user via API */
    // const requestContext = await request.newContext();
    // await usersRequest.createUser(requestContext, username, email);

    /* Launch browser */
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const poManager = new PoManager(page);
    const homePage = poManager.getHomePage();
    const registerPage = poManager.getRegisterPage();
    /* Register via UI */
    await homePage.open(baseURL!);
    await homePage.navigateToRegister();
    await registerPage.enterRegisterCredentials(username, email, password);
    await registerPage.clickRegister();
    await homePage.assertSuccessfulRegister(username);
    /* Save storage state into a file */
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;