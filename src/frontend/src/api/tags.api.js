import axios from "axios";

const BASE_URL = "http://35.204.79.162/"

// request list of all tag objects

export async function getAllTags() {
    try {
        let foundTags = await axios.get(BASE_URL + "api/user/tags/", { withCredentials: true });
        let tagsArray = foundTags.data;
        return tagsArray;
    } catch (error) {
        console.log(error);
    }
};