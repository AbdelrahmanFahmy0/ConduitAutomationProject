import { type Locator, type Page } from '@playwright/test';

export class SettingsPage {

    //=====================Locators=====================
    readonly page: Page;
    readonly logoutBtn: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.logoutBtn = page.getByRole('button', { name: ' Or click here to logout. ' });
    }

    //=====================Actions======================
    async clickOnLogoutBtn() {
        await this.logoutBtn.click();
    }
}