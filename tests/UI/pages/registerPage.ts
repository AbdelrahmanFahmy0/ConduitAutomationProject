import { expect, type Locator, type Page } from '@playwright/test';

export class RegisterPage {

    //=====================Locators=====================
    readonly page: Page;
    readonly username: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly registerBtn: Locator;
    readonly errorMsg: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[formcontrolname="username"]');
        this.email = page.locator('[formcontrolname="email"]');
        this.password = page.locator('[formcontrolname="password"]');
        this.registerBtn = page.locator('button[type="submit"]');
        this.errorMsg = page.locator('.error-messages > li');
    }

    //=====================Actions======================
    async enterUsername(username: string) {
        await this.username.fill(username);
    }

    async enterEmail(email: string) {
        await this.email.fill(email);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async enterRegisterCredentials(username: string, email: string, password: string) {
        await this.enterUsername(username);
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async clickRegister() {
        await this.registerBtn.click();
    }

    //=====================Assertions===================
    async assertRegisterBtnIsDisabled() {
        await expect(this.registerBtn).toBeDisabled();
    }

    async assertErrorMessage(message: string) {
        await expect(this.errorMsg).toHaveText(message);
    }
}