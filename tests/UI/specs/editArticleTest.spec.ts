import { test, expect } from '../fixtures/pageFixture';
import articlesData from '../../../test-data/articleData.json';
import articlesRequest from '../../API/endpoints/articlesEndpoint';

//===================Variables===================
const articleData = JSON.parse(JSON.stringify(articlesData));
const title = articleData.title + Date.now();
const description = articleData.description + ' Edited';
const body = articleData.body + ' Edited';
const tag = articleData.tag + ' Edited';

//===================Hooks=======================
test.beforeAll(async ({ request }) => {
    //runs once before all tests in the file
    let response = await articlesRequest.createArticle(request, title);
    expect(response.status()).toBe(201);
});

test.beforeEach(async ({ homePage, articlePage }) => {
    //runs before every test in the file
    await homePage.open('/');
    await homePage.navigateToArticle(title);
    await articlePage.clickEditArticleBtn();
});

//====================Tests======================
test.describe('Edit Article Tests', { tag: '@regression' }, () => {

    test('Edit all article details TC', { tag: '@smoke' }, async ({ manageArticlePage, articlePage, profilePage }) => {
        const timeStamp = ' ' + Date.now();
        await manageArticlePage.waitForDataLoad();
        await manageArticlePage.enterArticleTitle(title + timeStamp);
        await manageArticlePage.enterArticleDescription(description + timeStamp);
        await manageArticlePage.enterArticleBody(body + timeStamp);
        await manageArticlePage.enterArticleTagList(articleData.tag1);
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleTitle(title + timeStamp);
        await articlePage.assertArticleBody(body + timeStamp);
        await articlePage.assertArticleHasTag(articleData.tag1);
        await articlePage.navigateToProfilePage();
        await profilePage.assertArticleDescription(title + timeStamp, description + timeStamp);
    });

    test('Edit the article title TC', async ({ manageArticlePage, articlePage }) => {
        await manageArticlePage.waitForDataLoad();
        await manageArticlePage.enterArticleTitle(title + ' Edited');
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleTitle(title + ' Edited');
    });

    test('Edit the article description TC', async ({ manageArticlePage, profilePage, articlePage }) => {
        await manageArticlePage.waitForDataLoad();
        await manageArticlePage.enterArticleDescription(description);
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.navigateToProfilePage();
        await profilePage.assertArticleDescription(title, description);
    });

    test('Edit the article body TC', async ({ manageArticlePage, articlePage }) => {
        await manageArticlePage.waitForDataLoad();
        await manageArticlePage.enterArticleBody(body);
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleBody(body);
    });

    test('Edit the article tag list TC', async ({ manageArticlePage, articlePage }) => {
        await manageArticlePage.waitForDataLoad();
        await manageArticlePage.enterArticleTagList(tag);
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleHasTag(tag);
    });

    test('Remove all tags from the article TC', { tag: '@smoke' }, async ({ manageArticlePage, articlePage }) => {
        await manageArticlePage.waitForDataLoad();
        await manageArticlePage.clearArticleTagList();
        await manageArticlePage.clickPublishArticleBtn();
        await articlePage.assertArticleHasNoTags();
    });
});