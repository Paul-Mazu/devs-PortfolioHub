import "./RegistrationForm.css";
import React, { useState } from 'react';
import { userRegistration } from "../../api/users.api";

export default function RegistrationForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "name") {
            setName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }
    }

    // should also contain various validation functions for email, password and the form itself

    return (
        <div className="registration-container text-center">
            <div className="form-card">
                <h2 className="font-jost weight-normal">Registration Form</h2>
                <h3 className="font-jost weight-normal">Register to create a profile and curate your own portfolio</h3>

                <div className="form-inputs">
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="text" id="name" value={name} onChange={(e) => handleInputChange(e)} placeholder="Name" required/>
                    </div>
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="email" id="email" value={email} onChange={(e) => handleInputChange(e)} placeholder="" required/>
                    </div>
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="" required/>
                    </div>
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} placeholder="" required/>
                    </div>
                </div>

                {/* <Link to="/profile"> */}
                <button onClick={() => userRegistration(name, email, password)} type="submit" className='form-button'>Register</button>
                {/* </Link> */}
            </div>
        </div>
    )
}

        // For now: disabled link, redirect from frontend to next page when post request is successful. Still janky
        // window.location.assign("/profile");        
        // window.location = "/profile";
        // return <Navigate to="/profile" />
