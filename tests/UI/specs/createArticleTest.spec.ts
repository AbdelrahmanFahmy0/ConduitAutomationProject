import { test } from '../fixtures/pageFixture';
import articlesData from '../../../test-data/articleData.json';

//===================Variables===================
const articleData = JSON.parse(JSON.stringify(articlesData));
const title = articleData.title + Date.now();
const description = articleData.description;
const body = articleData.body;
const tag = articleData.tag;

//===================Hooks=======================
test.beforeEach(async ({ homePage }) => {
    //runs before every test in the file
    await homePage.open('/');
    await homePage.navigateToNewArticle();
});

//====================Tests======================
test.describe('Create Article Tests', { tag: '@regression' }, () => {

    test('Create new article with valid data TC', { tag: '@smoke' }, async ({ manageArticlePage, articlePage }) => {
        await manageArticlePage.enterArticleTitle(title);
        await manageArticlePage.enterArticleDescription(description);
        await manageArticlePage.enterArticleBody(body);
        await manageArticlePage.enterArticleTagList(tag);
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleIsAdded(title);
    });

    test('Create new article with empty tag list TC', async ({ manageArticlePage, articlePage }) => {
        await manageArticlePage.enterArticleTitle(title + '1');
        await manageArticlePage.enterArticleDescription(description);
        await manageArticlePage.enterArticleBody(body);
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleIsAdded(title + '1');
    });

    test('create new article with multiple tags TC', { tag: '@smoke' }, async ({ manageArticlePage, articlePage }) => {
        await manageArticlePage.enterArticleTitle(title + '2');
        await manageArticlePage.enterArticleDescription(description);
        await manageArticlePage.enterArticleBody(body);
        await manageArticlePage.enterArticleTagList(tag);
        await manageArticlePage.enterArticleTagList(tag + '2');
        await manageArticlePage.enterArticleTagList(tag + '3');
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleIsAdded(title + '2');
    });

    test('Create new article with empty data TC', async ({ manageArticlePage }) => {
        await manageArticlePage.clickPublishArticleBtn();
        await manageArticlePage.assertErrorMessage(articleData.messages.emptyTitle);
    });

    test('Create new article with empty title TC', async ({ manageArticlePage }) => {
        await manageArticlePage.enterArticleDescription(description);
        await manageArticlePage.enterArticleBody(body);
        await manageArticlePage.enterArticleTagList(tag);
        await manageArticlePage.clickPublishArticleBtn();
        await manageArticlePage.assertErrorMessage(articleData.messages.emptyTitle);
    });

    test('Create new article with empty description TC', async ({ manageArticlePage }) => {
        await manageArticlePage.enterArticleTitle(title);
        await manageArticlePage.enterArticleBody(body);
        await manageArticlePage.enterArticleTagList(tag);
        await manageArticlePage.clickPublishArticleBtn();
        await manageArticlePage.assertErrorMessage(articleData.messages.emptyDescription);
    });

    test('Create new article with empty body TC', async ({ manageArticlePage }) => {
        await manageArticlePage.enterArticleTitle(title);
        await manageArticlePage.enterArticleDescription(description);
        await manageArticlePage.enterArticleTagList(tag);
        await manageArticlePage.clickPublishArticleBtn();
        await manageArticlePage.assertErrorMessage(articleData.messages.emptyBody);
    });
});