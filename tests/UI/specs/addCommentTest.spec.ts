import { test, expect } from '../fixtures/pageFixture';
import articlesData from '../../../test-data/articleData.json';
import articlesRequest from '../../API/endpoints/articlesEndpoint';

//===================Variables===================
const articleData = JSON.parse(JSON.stringify(articlesData));
const title = articleData.title + Date.now();
const comment = articleData.comment + Date.now();

//===================Hooks=======================
test.beforeAll(async ({ request }) => {
    //runs once before all tests in the file
    let response = await articlesRequest.createArticle(request, title);
    expect(response.status()).toBe(201);
});

test.beforeEach(async ({ homePage }) => {
    //runs before every test in the file
    await homePage.open('/');
    await homePage.navigateToArticle(title);
});

//====================Tests======================
test.describe('Add Comment on Article Tests', { tag: '@regression' }, () => {

    test('Add comment on article TC', { tag: '@smoke' }, async ({ articlePage }) => {
        await articlePage.enterComment(comment);
        await articlePage.clickPostCommentBtn();
        await articlePage.assertCommentIsAdded(comment);
    });

    test('Add empty comment on article TC', async ({ articlePage }) => {
        await articlePage.clickPostCommentBtn();
        await articlePage.assertErrorMessage(articleData.messages.emptyComment);
    });
});