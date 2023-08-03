import axios from "axios";
import { setToken } from "../helpers/helpers.js";

// a file to bundle and export the various user APIs (create, login (token), logout, delete)

// const BASE_URL = "http://localhost:8000/"
const BASE_URL = "http://35.204.79.162/"

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
        userLogIn(email, password, true);
    }
    catch (err) {
        console.log(err.message);
    }
}
export async function userEdit (userToken, data) {   

    // data is an object with key-value pairs
    // extract keys and values to pass into axios data parameter dynamically

    Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

    try {
        console.log("Trying...");
        await axios({
            method: 'patch',
            withCredentials: true,
            url: BASE_URL + "api/user/me/",
            headers: { 
                'content-type': 'multipart/form-data',
                Authorization: `token ${userToken}`
            },
            data: data
        });
        window.location = "/profile/edit";
        console.log(`User updated successfully`);
    }
    catch (err) {
        console.log("Catching...");
        console.log(err.message);
    }
}

export async function userLogIn (email, password, edit = false) {
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
        if (edit) {window.location = "/profile/edit"} else {window.location = "/profile";}
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