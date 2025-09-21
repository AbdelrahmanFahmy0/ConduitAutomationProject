import { expect, type Locator, type Page } from '@playwright/test';

export class ProfilePage {

    //=====================Locators=====================
    readonly page: Page;
    readonly article: Locator;
    readonly homePage: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.article = page.locator('//a[@class = "preview-link"]');
        this.homePage = page.locator('a[routerlink="/"]').first();
    }

    //=====================Actions======================
    async navigateToHomePage() {
        await this.homePage.click();
    }

    //=====================Assertions===================
    async assertArticleDescription(articleTitle: string, articleDescription: string) {
        const description = this.page.locator('//h1[contains(text(), "' + articleTitle + '")]//following-sibling::p');
        await expect(description).toHaveText(articleDescription);
    }

    async assertArticleIsDeleted(articleTitle: string) {
        await this.page.waitForLoadState('networkidle');
        await expect(this.article.filter({ hasText: articleTitle })).toHaveCount(0);
    }
}