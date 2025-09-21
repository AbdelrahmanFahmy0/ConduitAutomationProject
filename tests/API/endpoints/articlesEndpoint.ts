import { APIRequestContext } from "@playwright/test";
import articlesData from '../../../test-data/articleData.json';
import cookies from '../../../storage-state.json';

//==========================Requests Objects===================
const baseUrl = 'https://conduit-api.bondaracademy.com/api';
const endpoint = '/articles';
const data = JSON.parse(JSON.stringify(articlesData));
const articleData = {
    "article": {
        "title": "",
        "description": data.description,
        "body": data.body,
        "tagList": [data.tag]
    }
};
const articleheaders = {
    'Authorization': 'Token ' + cookies.origins[0].localStorage[0].value
};

//==========================Requests===========================
async function createArticle(request: APIRequestContext, title: string) {
    articleData.article.title = title;
    const response = request.post(baseUrl + endpoint, { data: articleData, headers: articleheaders });
    return response;
}

//==========================Exports============================
export default { createArticle };