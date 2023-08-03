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
    
    // with this, I can successfully return a file or blob, however neither is accepted by the API

    async function createFile(imgUrl){
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imgUrl;
        let response = await fetch(imgUrl);
        let data = await response.blob();
        let metadata = {
        type: 'image/jpeg'
        };
        let file = new File([img], "test.jpg", metadata);
        let fileReader = new FileReader();
        fileReader.onload = function (evt) {success(evt.target.result)};
        fileReader.readAsText(file);
        let binaryString = fileReader.result;
        console.log("createFile binary string");
        console.log(binaryString);
        console.log(fileReader);
        return fileReader;
    }

    function success (content) {
        console.log("Success"); 
        let string = JSON.stringify(content)
        console.log(string); 
        data.profile_image = string;
    }
      
    

    // data is an object with key-value pairs
    // extract keys and values to pass into axios data parameter dynamically

    Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

    if (data.profile_image !== undefined) {
        let binaryString = await createFile(data.profile_image);
        console.log("binary string");
        console.log(binaryString);
        // data.profile_image = binaryString;
    }
    console.log("data");
    console.log(data);

    try {
        console.log("Trying...");
        console.log(data);
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
        // window.location = "/profile";
        console.log(`User updated successfully`);
    }
    catch (err) {
        console.log("Catching...");
        console.log(data);
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