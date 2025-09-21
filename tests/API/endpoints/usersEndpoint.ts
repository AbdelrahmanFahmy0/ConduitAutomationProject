import { APIRequestContext } from "@playwright/test";
import usersData from '../../../test-data/authData.json';

//==========================Requests Objects===================
const baseUrl = 'https://conduit-api.bondaracademy.com/api';
const endpoint = '/users';
const data = JSON.parse(JSON.stringify(usersData));
const userData = {
    "user": {
        "email": "",
        "password": data.password,
        "username": ""
    }
};

//==========================Requests===========================
async function createUser(request: APIRequestContext, username: string, email: string) {
    userData.user.email = email;
    userData.user.username = username;
    const response = request.post(baseUrl + endpoint, { data: userData });
    return response;
}

//==========================Exports============================
export default { createUser };

