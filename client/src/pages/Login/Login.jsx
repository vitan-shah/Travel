import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import logo from '../../assets/logo-vertical.svg';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });
    const { loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    return (
        <>
            <div className="login">
                <div>
                    <div className='logo'>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="lContainer">
                        <input
                            type="text"
                            placeholder="username"
                            id="username"
                            onChange={handleChange}
                            className="lInput"
                        />
                        <input
                            type="password"
                            placeholder="password"
                            id="password"
                            onChange={handleChange}
                            className="lInput"
                        />
                        <button disabled={loading} onClick={handleClick} className="lButton">
                            Login
                        </button>
                        {error && <span>{error.message}</span>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;