import { expect, type Locator, type Page } from '@playwright/test';

export class ArticlePage {

    //=====================Locators=====================
    readonly page: Page;
    readonly profilePage: Locator;
    readonly title: Locator;
    readonly body: Locator;
    readonly tag: Locator;
    readonly editArticleBtn: Locator;
    readonly deleteArticleBtn: Locator;
    readonly comment: Locator;
    readonly postCommentBtn: Locator;
    readonly addedComment: Locator;
    readonly errorMsg: Locator;
    readonly trashIcon: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.profilePage = page.locator('.banner .article-meta > a');
        this.title = page.locator('.container > h1');
        this.body = page.locator('//div[@class="container page"]//p');
        this.tag = page.locator('.article-page ul.tag-list li');
        this.editArticleBtn = page.locator('div.banner span  a');
        this.deleteArticleBtn = page.locator('div.banner span  button');
        this.comment = page.locator('.card-block > textarea');
        this.postCommentBtn = page.locator('.card-footer > button');
        this.addedComment = page.locator('//app-article-comment/div[@class="card"]');
        this.errorMsg = page.locator('.error-messages > li');
        this.trashIcon = page.locator('i.ion-trash-a');
    }

    //=====================Actions======================
    async clickEditArticleBtn() {
        await this.editArticleBtn.click();
    }

    async clickDeleteArticleBtn() {
        await this.deleteArticleBtn.click();
    }

    async navigateToProfilePage() {
        await this.profilePage.click();
    }

    async enterComment(comment: string) {
        await this.comment.fill(comment);
    }

    async clickPostCommentBtn() {
        await this.postCommentBtn.click();
    }

    async deleteComment(comment: string) {
        await this.addedComment.filter({ hasText: comment }).locator(this.trashIcon).click();
    }

    //=====================Assertions===================
    async assertArticleIsAdded(title: string) {
        await expect(this.title).toHaveText(title);
    }

    async assertArticleTitle(title: string) {
        await expect(this.title).toHaveText(title);
    }

    async assertArticleBody(title: string) {
        await expect(this.body).toHaveText(title);
    }

    async assertArticleHasTag(tag: string) {
        await expect(this.tag.filter({ hasText: tag })).toBeVisible();
    }

    async assertArticleHasNoTags() {
        await expect(this.tag).not.toBeVisible();
    }

    async assertCommentIsAdded(comment: string) {
        await expect(this.addedComment.filter({ hasText: comment })).toBeVisible();
    }

    async assertErrorMessage(message: string) {
        await expect(this.errorMsg).toHaveText(message);
    }

    async assertCommentIsDeleted(comment: string) {
        await expect(this.addedComment.filter({ hasText: comment })).toHaveCount(0);
    }
}