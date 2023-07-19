import axios from "axios";

// a file to bundle and export the various project APIs (find all, filter, find one by ID)

const BASE_URL = "http://localhost:8000/"

export async function getAllProjects () {
    try {        
        let foundProjects = await axios.get(BASE_URL + "api/project/projects/", { withCredentials: true });
        console.log(foundProjects)
        return foundProjects;
    } catch (error) {
        console.log(error);
    }
};

// the filters parameter is simply a placeholder for now for the actual filters we want to use depending on the backend API provided

export async function getFilteredProjects (name, tags) {
    try {        
        let foundProjects = await axios.get(BASE_URL + "api/project/projects/", {params: {name: name, tags: tags}}, { withCredentials: true });
        return foundProjects;
    } catch (error) {
        console.log(error);
    }
};

// the actual implementation depends on the backend API - i.e. id in params or in url? /api/user/users/{id}/

//export async function getDeveloperById (id) {
//    try {        
//        let foundDeveloper = await axios.get(BASE_URL + "api/user/users/" + id, { withCredentials: true });
//        return foundDeveloper;
//    } catch (error) {
//        console.log(error);
//    }
//};

// might move this into user apis? 

//export async function getCurrentDeveloper (userToken) {
//    try {        
//        let foundDeveloper = await axios.get(BASE_URL + "api/user/me/", { withCredentials: true, headers: { Authorization: `token ${userToken}`} });
//        return foundDeveloper;
//    } catch (error) {
//        console.log(error.message);
//    }
//};


