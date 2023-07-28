import axios from "axios";

// a file to bundle and export the various developer APIs (find all, filter, find one by ID, find active user)

// const BASE_URL = "http://localhost:8000/"
const BASE_URL = "http://35.204.79.162/"

export async function getAllDevelopers() {
    try {
        let foundDevelopers = await axios.get(BASE_URL + "api/user/users/", { withCredentials: true });
        console.log(foundDevelopers)
        return foundDevelopers;
    } catch (error) {
        console.log(error);
    }
};

// filtered developer search: basic version can only receive a single term and look for matches in relevant fields

export async function getFilteredDevelopersBasic(query) {
    try {
        let nameMatches = await axios.get(BASE_URL + "api/user/users/", { params: { name: query } }, { withCredentials: true });
        let tagsMatches = await axios.get(BASE_URL + "api/user/users/", { params: { tags: query } }, { withCredentials: true });
        if (nameMatches.data.length > 0 & tagsMatches.data.length > 0) {
            return [nameMatches.data, tagsMatches.data]
        } else if (nameMatches.data.length > 0) {
            return [nameMatches.data]
        } else if (tagsMatches.data.length > 0) {
            return [tagsMatches.data]
        }
    } catch (error) {
        console.log(error);
    }
};

// filtered developer search: advanced version matches against several parameters at once

export async function getFilteredDevelopersAdvanced(name, tags) {
    try {
        let foundDevelopers = await axios.get(BASE_URL + "api/user/users/", { params: { name: name, tags: tags } }, { withCredentials: true });
        return foundDevelopers;
    } catch (error) {
        console.log(error);
    }
};

// the actual implementation depends on the backend API - i.e. id in params or in url? /api/user/users/{id}/

export async function getDeveloperById(id) {
    try {
        let foundDeveloper = await axios.get(BASE_URL + "api/user/users/" + id, { withCredentials: true });
        return foundDeveloper;
    } catch (error) {
        console.log(error);
    }
};