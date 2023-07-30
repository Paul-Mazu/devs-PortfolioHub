import "./MyProfileEditForm.css";
import React, { useEffect, useState } from 'react';
import { userEdit, getCurrentUser } from "../../api/users.api";
import { getToken } from "../../helpers/helpers.js";

export default function RegistrationForm() {
    const [activeUser, setActiveUser] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [data, setData] = useState("");
  
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
        if (id === "name") {
            setName(value);
        }
        if (id === "data") {
            setData(value);
        }
    }

    // should also contain various validation functions for email, password and the form itself

    return (
        <div className="registration-container">
            <div className="form-card">
                <h2>Registration Form</h2>
                <h3>Register to create a profile and curate your own portfolio</h3>

                <div className="form-inputs">
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="text" id="name" value={name} onChange={(e) => handleInputChange(e)} placeholder="Name" required/>
                    </div>
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="email" id="email" value={data} onChange={(e) => handleInputChange(e)} placeholder="" required/>
                    </div>
                </div>

                {/* <Link to="/profile"> */}
                <button onClick={() => userEdit(userToken, data)} type="submit" className='form-button'>Register</button>
                {/* </Link> */}
            </div>
        </div>
    )
}

        // For now: disabled link, redirect from frontend to next page when post request is successful. Still janky
        // window.location.assign("/profile");        
        // window.location = "/profile";
        // return <Navigate to="/profile" />
