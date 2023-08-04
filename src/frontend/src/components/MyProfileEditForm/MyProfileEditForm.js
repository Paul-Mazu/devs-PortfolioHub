import "./MyProfileEditForm.css";
import React, { useEffect, useState } from 'react';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { userEdit, getCurrentUser } from "../../api/users.api";
import { getAllTags } from "../../api/tags.api";
import { getToken } from "../../helpers/helpers.js";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function RegistrationForm() {
    const [data, setData] = useState({});
    const [activeUser, setActiveUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const userToken = getToken();

    useEffect(() => {
        getCurrentUser(userToken)
            .then((response) => setActiveUser(response.data))
            .then(() => setLoading(false))
            .catch(e => setActiveUser(false))
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        callTagsAPI()
            .then((response) => setItems(response))
            .catch(e => setItems([]));
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData({
            ...data,
            [id]: value
        });
    }

    const handleCheckboxChange = (e) => {
        // status_open_to_work will initially be undefined on loading the edit form 
        setData({
            ...data,
            status_open_to_work: data.status_open_to_work === undefined ? !activeUser.status_open_to_work : !data.status_open_to_work
        });
    }

    const handleImageChange = (e) => {
        setData({
            ...data,
            profile_image: e.target.files[0]
        });
    }

    // console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        // package modified fields into a single data object to submit to edit form
        userEdit(userToken, data)
    }

    const callTagsAPI = async () => {
        let foundTags = await getAllTags()
            .then((e) => e.map((obj, i) => ({ ...obj, id: i })))
            // .then((e) => e.map(obj => obj.name))
            .catch((err) => console.log(err));
        return foundTags
    };


    const handleOnSearch = (string, results) => {
        console.log(string, results);
    };

    const handleOnHover = (result) => {
        console.log(result);
    };

    const handleOnSelect = (item) => {
        console.log(item);
    };

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const handleOnClear = () => {
        console.log("Cleared");
    };

    const formatResult = (item) => {
        console.log(item);
        return (
            <div className="result-wrapper">
                <span className="result-span">id: {item.id}</span>
                <span className="result-span">name: {item.name}</span>
            </div>
        );
    };

    // should also contain various validation functions for email, password and the form itself

    return (
        <div className="main">
            {loading &&
                <p>LOADING...</p>
            }
            {!loading && activeUser &&
                <div className="registration-container">
                    <form className="form-card" onSubmit={(e) => handleSubmit(e)} onReset={(e) => setData({})} >
                        <h2>Edit Form</h2>
                        <h3>Edit your profile data</h3>

                        <div className="form-inputs">
                            <div className="input-field">
                                <label className="form-label" htmlFor="name">Name:</label>
                                <input className="input" type="text" id="name" value={data.name} onChange={(e) => handleInputChange(e)} placeholder={activeUser.name} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="email">E-Mail:</label>
                                <input className="input" type="email" id="email" value={data.email} onChange={(e) => handleInputChange(e)} placeholder={activeUser.email} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="profile_image">Profile Image:</label>
                                <input className="input" type="file" id="profile_image" accept="image/png, image/jpeg" onChange={(e) => handleImageChange(e)} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="status_open_to_work">Looking for Work:</label>
                                <input className="input" type="checkbox" id="status_open_to_work" onChange={(e) => handleCheckboxChange(e)} defaultChecked={activeUser.status_open_to_work} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="tags">Skill Tags:</label>
                                <ReactSearchAutocomplete
                                    items={items}
                                    resultStringKeyName="name" // String to display in the results
                                    onSearch={handleOnSearch}
                                    onHover={handleOnHover}
                                    onSelect={handleOnSelect}
                                    onFocus={handleOnFocus}
                                    onClear={handleOnClear}
                                    showIcon={false}
                                    styling={{
                                        height: "34px",
                                        border: "1px solid darkgreen",
                                        borderRadius: "4px",
                                        backgroundColor: "white",
                                        boxShadow: "none",
                                        hoverBackgroundColor: "lightgreen",
                                        color: "darkgreen",
                                        fontSize: "12px",
                                        fontFamily: "Courier",
                                        iconColor: "green",
                                        lineColor: "lightgreen",
                                        placeholderColor: "darkgreen",
                                        clearIconMargin: "3px 8px 0 0",
                                        zIndex: 2,
                                    }}
                                />

                                {/* <input className="input" type="text" id="tags" onChange={(e) => handleCheckboxChange(e)} defaultChecked={activeUser.tags} /> */}
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="title">Title:</label>
                                <input className="input" type="text" id="title" value={data.title} onChange={(e) => handleInputChange(e)} placeholder={activeUser.title} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="working_at">Company:</label>
                                <input className="input" type="text" id="working_at" value={data.working_at} onChange={(e) => handleInputChange(e)} placeholder={activeUser.working_at} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="short_desc">Short Description:</label>
                                <input className="input" type="text" id="short_desc" value={data.short_desc} onChange={(e) => handleInputChange(e)} placeholder={activeUser.short_desc} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="bio">Biography:</label>
                                <input className="input" type="text" id="bio" value={data.bio} onChange={(e) => handleInputChange(e)} placeholder={activeUser.bio} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="address">Country of Residence:</label>
                                <input className="input" type="text" id="address" value={data.address} onChange={(e) => handleInputChange(e)} placeholder={activeUser.address} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="github_link">Github Profile:</label>
                                <input className="input" type="text" id="github_link" value={data.github_link} onChange={(e) => handleInputChange(e)} placeholder={activeUser.github_link} />
                            </div>
                            <div className="input-field">
                                <label className="form-label" htmlFor="linkedin_link">LinkedIn Profile:</label>
                                <input className="input" type="text" id="linkedin_link" value={data.linkedin_link} onChange={(e) => handleInputChange(e)} placeholder={activeUser.linkedin_link} />
                            </div>
                        </div>
                        <button type="submit" className='form-button' disabled={Object.keys(data).length === 0 ? true : false} >Submit edits</button>
                        <button type="reset" className='form-button'>Reset edits</button>
                        <button type="reset" className='form-button' onClick={(e) => window.location = "/profile"}>Cancel and Return to Profile</button>
                    </form>
                </div>
            }
            {!loading && !activeUser &&
                <ErrorMessage
                    e={
                        {
                            code: 401,
                            message: "You are not allowed to view this page without logging in."
                        }
                    }
                />
            }
        </div>
    )
}