import { test, expect } from '../fixtures/pageFixture';
import articlesData from '../../../test-data/articleData.json';
import articlesRequest from '../../API/endpoints/articlesEndpoint';
import commentsRequest from '../../API/endpoints/commentsEndpoint';

//===================Variables===================
const articleData = JSON.parse(JSON.stringify(articlesData));
const title = articleData.title + Date.now();
const comment = articleData.comment + Date.now();

//===================Hooks=======================
test.beforeAll(async ({ request }) => {
    //API call to create an article
    let articleResponse = await articlesRequest.createArticle(request, title);
    expect(articleResponse.status()).toBe(201);
    let jsonResponse = await articleResponse.json();
    const articleSlug = jsonResponse.article.slug;

    //API call to add a comment to the created article
    let commentResponse = await commentsRequest.createComment(request, articleSlug, comment);
    expect(commentResponse.status()).toBe(200);
});

test.beforeEach(async ({ homePage }) => {
    //runs before every test in the file
    await homePage.open('/');
    await homePage.navigateToArticle(title);
});

//====================Tests======================
test.describe('Delete Comment from Article Tests', () => {

    test('Delete comment from article TC', { tag: ['@smoke', '@regression'] }, async ({ articlePage }) => {
        await articlePage.deleteComment(comment);
        await articlePage.assertCommentIsDeleted(comment);
    });
});