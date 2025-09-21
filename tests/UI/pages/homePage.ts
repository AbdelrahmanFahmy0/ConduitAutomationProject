import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {

    //=====================Locators=====================
    readonly page: Page;
    readonly registerLink: Locator;
    readonly loginLink: Locator;
    readonly settingsLink: Locator;
    readonly newArticleLink: Locator;
    readonly profileLink: Locator;
    readonly articleLink: Locator;
    readonly profileUserame: Locator;
    readonly globalFeed: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.registerLink = page.locator('a[routerlink="/register"]');
        this.loginLink = page.locator('a[routerlink="/login"]');
        this.settingsLink = page.locator('a[routerlink="/settings"]');
        this.newArticleLink = page.locator('a[routerlink="/editor"]');
        this.profileLink = page.locator('//img[@class="user-pic"]/parent::a');
        this.articleLink = page.locator('//a[@class="preview-link"]');
        this.profileUserame = page.locator('//li[@class="nav-item"][4]/a');
        this.globalFeed = page.locator('//a[text()= " Global Feed "]');
    }

    //=====================Actions======================
    async open(url: string) {
        await this.page.goto(url);
    }

    async navigateToRegister() {
        await this.registerLink.click();
    }

    async navigateToLogin() {
        await this.loginLink.click();
    }

    async navigateToSettings() {
        await this.settingsLink.click();
    }

    async navigateToProfilePage() {
        await this.page.reload({ waitUntil: 'networkidle' });
        await this.globalFeed.waitFor();
        await this.profileLink.click();
    }

    async navigateToNewArticle() {
        await this.newArticleLink.click();
    }

    async navigateToArticle(articleTitle: string) {
        await this.articleLink.filter({ hasText: articleTitle }).click();
    }

    //=====================Assertions===================
    async assertSuccessfulRegister(username: string) {
        await expect(this.profileUserame).toContainText(username);
    }

    async assertSuccessfulLogin(username: string) {
        await expect(this.profileUserame).toContainText(username);
    }

    async assertSuccessfulLogout() {
        await expect(this.loginLink).toBeVisible();
    }
}