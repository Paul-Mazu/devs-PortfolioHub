import "./MyProfileEditForm.css";
import React, { useEffect, useState } from 'react';
import { userEdit, getCurrentUser } from "../../api/users.api";
import { getToken } from "../../helpers/helpers.js";

export default function RegistrationForm() {
    const [activeUser, setActiveUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        profile_image: "",
        short_desc: "",
        tags: [],
        bio: "",
        title: "",
        working_at: "",
        address: "",
        status_open_to_work: false,
        github_link: "",
        linkedin_link: "",
        website_link: "",
    });
  
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
        setData({id: value});
    }

    const handleSubmit = (e) => {
        // package modified fields into a single data object to submit to edit form
        const data = e.target
        userEdit(userToken, data)
    }

    // should also contain various validation functions for email, password and the form itself

    return (
        <div className="registration-container">
            <div className="form-card">
                <h2>Edit Form</h2>
                <h3>Edit your profile data</h3>

                <div className="form-inputs">
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="text" id="name" value={data.name} onChange={(e) => handleInputChange(e)} placeholder={activeUser.name}/>
                    </div>
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="email" id="email" value={data.email} onChange={(e) => handleInputChange(e)} placeholder={activeUser.email}/>
                    </div>
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="text" id="profile_image" value={data.profile_image} onChange={(e) => handleInputChange(e)} placeholder={activeUser.profile_image}/>
                    </div>
                </div>

                {/* <Link to="/profile"> */}
                <button onClick={(e) => handleSubmit(e)} type="submit" className='form-button'>Submit edits</button>
                {/* </Link> */}
            </div>
        </div>
    )
}

        // For now: disabled link, redirect from frontend to next page when post request is successful. Still janky
        // window.location.assign("/profile");        
        // window.location = "/profile";
        // return <Navigate to="/profile" />
