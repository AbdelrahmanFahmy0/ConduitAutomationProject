import { test, expect } from '../fixtures/pageFixture';
import articlesData from '../../../test-data/articleData.json';
import articlesRequest from '../../API/endpoints/articlesEndpoint';

//===================Variables===================
const articleData = JSON.parse(JSON.stringify(articlesData));
const title = articleData.title + Date.now();

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
test.describe('Delete Article Tests', () => {

    test('Delete article TC', { tag: ['@smoke', '@regression'] }, async ({ articlePage, homePage, profilePage }) => {
        await articlePage.clickDeleteArticleBtn();
        await homePage.navigateToProfilePage();
        await profilePage.assertArticleIsDeleted(title);
    });
});