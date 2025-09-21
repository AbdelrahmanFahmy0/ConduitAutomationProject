import { test } from '../../fixtures/pageFixture';
import usersData from '../../../../test-data/authData.json';
import articlesData from '../../../../test-data/articleData.json';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

//===================Variables===================
const userData = JSON.parse(JSON.stringify(usersData));
const articleData = JSON.parse(JSON.stringify(articlesData));
const timestamp = Date.now();
const username = userData.username + timestamp;
const email = username + userData.email;
const password = userData.password;
const title = articleData.title + timestamp;
const description = articleData.description;
const body = articleData.body;
const tag = articleData.tag;
const comment = articleData.comment + timestamp;

//====================Tests======================
test('End-to-End TC', { tag: '@e2e' }, async ({ homePage, loginPage, registerPage, manageArticlePage, articlePage, profilePage, settingsPage }) => {
    //Register
    await homePage.open('/');
    await homePage.navigateToRegister();
    await registerPage.enterRegisterCredentials(username, email, password);
    await registerPage.clickRegister();
    await homePage.assertSuccessfulRegister(username);
    //Logout
    await homePage.navigateToSettings();
    await settingsPage.clickOnLogoutBtn();
    await homePage.assertSuccessfulLogout();
    //Login
    await homePage.navigateToLogin();
    await loginPage.enterLoginCredentials(email, password);
    await loginPage.clickLogin();
    await homePage.assertSuccessfulLogin(username);
    //Create Article
    await homePage.navigateToNewArticle();
    await manageArticlePage.enterArticleDetails(title, description, body, tag);
    await manageArticlePage.clickPublishArticleBtn();
    await articlePage.assertArticleIsAdded(title);
    //Edit Article
    await articlePage.clickEditArticleBtn();
    await manageArticlePage.waitForDataLoad();
    await manageArticlePage.enterArticleDetails(title + 'Edited', description + 'Edited', body + 'Edited', articleData.tag1);
    await manageArticlePage.clickPublishArticleBtn();
    await articlePage.assertArticleTitle(title + 'Edited');
    await articlePage.assertArticleBody(body + 'Edited');
    await articlePage.assertArticleHasTag(articleData.tag1);
    await articlePage.navigateToProfilePage();
    await profilePage.assertArticleDescription(title + 'Edited', description + 'Edited');
    //Add Comment on Article
    await profilePage.navigateToHomePage();
    await homePage.navigateToArticle(title + 'Edited');
    await articlePage.enterComment(comment);
    await articlePage.clickPostCommentBtn();
    await articlePage.assertCommentIsAdded(comment);
    //Delete Comment
    await articlePage.deleteComment(comment);
    await articlePage.assertCommentIsDeleted(comment);
    //Delete Article
    await articlePage.clickDeleteArticleBtn();
    await homePage.navigateToProfilePage();
    await profilePage.assertArticleIsDeleted(title + 'Edited');
    //Logout
    await homePage.open('/');
    await homePage.navigateToSettings();
    await settingsPage.clickOnLogoutBtn();
    await homePage.assertSuccessfulLogout();
});