import { expect, type Locator, type Page } from '@playwright/test';

export class ManageArticlePage {

    //=====================Locators=====================
    readonly page: Page;
    readonly title: Locator;
    readonly description: Locator;
    readonly body: Locator;
    readonly tagList: Locator;
    readonly tag: Locator;
    readonly publishBtn: Locator;
    readonly errorMsg: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[formcontrolname="title"]');
        this.description = page.locator('[formcontrolname="description"]');
        this.body = page.locator('[formcontrolname="body"]');
        this.tagList = page.getByPlaceholder('Enter tags');
        this.tag = page.locator('.tag-list i');
        this.publishBtn = page.locator('button[type="button"]');
        this.errorMsg = page.locator('.error-messages > li');
    }

    //=====================Actions======================
    async enterArticleTitle(title: string) {
        await this.title.fill(title);
    }

    async enterArticleDescription(description: string) {
        await this.description.fill(description);
    }

    async enterArticleBody(body: string) {
        await this.body.fill(body);
    }

    async enterArticleTagList(tagList: string) {
        await this.tagList.fill(tagList);
        await this.tagList.press('Enter');
    }

    async clearArticleTagList() {
        for (let i = 0; i < await this.tag.count(); i++) {
            await this.tag.nth(i).click();
        }
    }

    async enterArticleDetails(title: string, description: string, body: string, tagList: string) {
        await this.enterArticleTitle(title);
        await this.enterArticleDescription(description);
        await this.enterArticleBody(body);
        await this.enterArticleTagList(tagList);
    }

    async clickPublishArticleBtn() {
        await this.publishBtn.click();
    }

    async waitForDataLoad() {
        await expect(this.title).not.toBeEmpty();
        await expect(this.description).not.toBeEmpty();
        await expect(this.body).not.toBeEmpty();
    }

    //=====================Assertions===================
    async assertErrorMessage(message: string) {
        await expect(this.errorMsg).toHaveText(message);
    }
}