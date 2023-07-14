import axios from "axios";

// a file to bundle and export the various user APIs (create, login (token), logout, delete)

const BASE_URL = "http://localhost:8000/"

// {
//     "email": "user@example.com",
//     "password": "string",
//     "name": "string",
//   }

export async function userRegistration (name, email, password) {
    console.log(name, email);

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
        window.location = "/profile";
    }
    catch (err) {
        console.log(err.message);
        // handleErrorMessage();

        // const registerData = await registerResponse;
        //need to return response as below
        // return registerData.json();
    }
}