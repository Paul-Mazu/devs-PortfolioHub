import axios from "axios";
import { setToken } from "../helpers/helpers.js";

// a file to bundle and export the various user APIs (create, login (token), logout, delete)

// const BASE_URL = "http://localhost:8000/"
const BASE_URL = "http://35.204.79.162/"

// {
//     "email": "user@example.com",
//     "password": "string",
//     "name": "string",
//   }

export async function userRegistration (name, email, password) {
    try {
        await axios({
            method: 'post',
            withCredentials: true,
            url: BASE_URL + "api/user/create/",
            data: {
                name: name,
                email: email,
                password: password
            }
        });
        console.log(`User ${name} registered successfully`);
        userLogIn(email, password);
    }
    catch (err) {
        console.log(err.message);
        // handleErrorMessage();

        // const registerData = await registerResponse;
        //need to return response as below
        // return registerData.json();
    }
}
export async function userEdit (userToken, data) {

    // data is an object with key-value pairs
    // extract keys and values to pass into axios data parameter dynamically

    try {
        await axios({
            method: 'patch',
            withCredentials: true,
            url: BASE_URL + "api/user/me/",
            headers: { Authorization: `token ${userToken}`},
            data: {
                name: data.name,
                email: data.email,
                profile_image: data.profile_image
            }
        });
        window.location = "/profile";
        console.log(`User ${data.name} updated successfully`);
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function userLogIn (email, password) {
    console.log(email);

    try {
        let token = await axios({
            method: 'post',
            withCredentials: true,
            url: BASE_URL + "api/user/token/",
            data: {
                email: email,
                password: password
            }
        }).then(response => response.data.token);
        console.log(`User signed in successfully`);
        setToken(token);
        window.location = "/profile";
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function getCurrentUser (userToken) {
    try {        
        let foundUser = await axios.get(BASE_URL + "api/user/me/", { withCredentials: true, headers: { Authorization: `token ${userToken}`} });
        return foundUser;
    } catch (error) {
        console.log(error.message);
    }
};