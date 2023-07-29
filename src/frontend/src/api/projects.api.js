import axios from "axios";

// a file to bundle and export the various project APIs (find all, filter, find one by ID)

const BASE_URL = "http://35.204.79.162/"

// filtered project search: basic version can only receive a single term and look for matches in relevant fields

export async function getFilteredProjectsBasic (query) {
    try {        
        let nameMatches = await axios.get(BASE_URL + "api/project/projects/", {params: {name: query}}, { withCredentials: true });
        let tagsMatches = await axios.get(BASE_URL + "api/project/projects/", {params: {tags: query}}, { withCredentials: true });
        let authorMatches = await axios.get(BASE_URL + "api/project/projects/", {params: {author: query}}, { withCredentials: true });
        // refactor by appending?
        if (nameMatches.data.length > 0 & tagsMatches.data.length > 0 & authorMatches.data.length > 0) {
            return [nameMatches.data, tagsMatches.data, authorMatches][0]
        } else if (nameMatches.data.length > 0 & tagsMatches.data.length > 0) {
            return [nameMatches.data, tagsMatches.data][0]
        } else if (nameMatches.data.length > 0 & authorMatches.data.length > 0) {
            return [nameMatches.data, authorMatches.data][0]
        } else if (tagsMatches.data.length > 0 & authorMatches.data.length > 0) {
            return [tagsMatches.data, authorMatches.data][0]
        } else if (nameMatches.data.length > 0) {
            return [nameMatches.data][0]
        } else if (tagsMatches.data.length > 0) {
            return [tagsMatches.data][0]
        } else if (authorMatches.data.length > 0) {
            return [authorMatches.data][0]
        } else {
            return []
        }
    } catch (error) {
        console.log(error);
    }
};

// filtered project search: advanced version matches against several parameters at once

export async function getFilteredProjectsAdvanced (name, tags, author) {
    try {        
        let foundProjects = await axios.get(BASE_URL + "api/project/projects/", {params: {name: name, tags: tags, author: author}}, { withCredentials: true });
        return foundProjects.data;
    } catch (error) {
        console.log(error);
    }
};