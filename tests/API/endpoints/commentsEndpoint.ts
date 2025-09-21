import { APIRequestContext } from "@playwright/test";
import cookies from '../../../storage-state.json';

//==========================Requests Objects===================
const baseUrl = 'https://conduit-api.bondaracademy.com/api/articles/';
const endpoint = '/comments';
const commentData = {
    "comment": {
        "body": ""
    }
};
const articleheaders = {
    'Authorization': 'Token ' + cookies.origins[0].localStorage[0].value
};

//==========================Requests===========================
async function createComment(request: APIRequestContext, articleSlug: string, text: string) {
    commentData.comment.body = text;
    const response = request.post(baseUrl + articleSlug + endpoint, { data: commentData, headers: articleheaders });
    return response;
}

//==========================Exports============================
export default { createComment };