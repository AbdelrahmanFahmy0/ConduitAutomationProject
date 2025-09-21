import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {

    //=====================Locators=====================
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly errorMsg: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('[formcontrolname="email"]');
        this.password = page.locator('[formcontrolname="password"]');
        this.loginBtn = page.locator('button[type="submit"]');
        this.errorMsg = page.locator('.error-messages > li');
    }

    //=====================Actions======================
    async enterEmail(email: string) {
        await this.email.fill(email);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async enterLoginCredentials(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async clickLogin() {
        await this.loginBtn.click();
    }

    //=====================Assertions===================
    async assertLoginBtnIsDisabled() {
        await expect(this.loginBtn).toBeDisabled();
    }

    async assertErrorMessage(message: string) {
        await expect(this.errorMsg).toHaveText(message);
    }
}