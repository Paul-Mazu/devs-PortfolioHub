import "./LogIn.css";
import React, { useState } from 'react';
import { userLogIn } from "../../api/users.api";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
    }

    return (
        <div className="login-container">
            <div className="form-card">
                <h2>Log-In Form</h2>
                <h3>Log into your account</h3>

                <div className="form-inputs">
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="email" id="email" value={email} onChange={(e) => handleInputChange(e)} placeholder="" required/>
                    </div>
                    <div className="input-field">
                        <label className="form-label" htmlFor=""></label>
                        <input className="input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="" required/>
                    </div>
                </div>

                {/* <Link to="/profile"> */}
                <button onClick={() => userLogIn(email, password)} type="submit" className='form-button'>Log In</button>
                {/* </Link> */}
            </div>
        </div>
    )
}