import axios from "axios";

// a file to bundle and export the various project APIs (find all, filter, find one by ID)

// filtered project search

const BASE_URL = "http://35.204.79.162/"

export async function getFilteredProjects (name, tags, author) {
    try {        
        let foundProjects = await axios.get(BASE_URL + "api/user/users/", {params: {name: name, tags: tags, author: author}}, { withCredentials: true });
        return foundProjects;
    } catch (error) {
        console.log(error);
    }
};