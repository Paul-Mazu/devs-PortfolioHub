import "./MyProfileEditForm.css";
import React, { useEffect, useState } from 'react';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { userEdit, getCurrentUser } from "../../api/users.api";
import { getToken } from "../../helpers/helpers.js";

export default function RegistrationForm() {
    const [data, setData] = useState({});
    const [activeUser, setActiveUser] = useState(false);
    const [loading, setLoading] = useState(true);

    const userToken = getToken();

    useEffect(() => {
        getCurrentUser(userToken)
            .then((response) => setActiveUser(response.data))
            .then(() => setLoading(false))
            .catch(e => setActiveUser(false))
            .then(() => setLoading(false));
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

    console.log(data)

    const handleSubmit = (e) => {
        e.preventDefault();
        // package modified fields into a single data object to submit to edit form
        userEdit(userToken, data)
    }

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
                        </div>
                        <button type="submit" className='form-button' disabled={Object.keys(data).length === 0 ? true : false} >Submit edits</button>
                        <button type="reset" className='form-button'>Reset edits</button>
                        <button type="reset" className='form-button' onClick={(e) => window.location="/profile"}>Cancel and Return to Profile</button>
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