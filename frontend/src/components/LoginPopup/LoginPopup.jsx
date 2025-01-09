import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, token, setToken } = useContext(StoreContext); 
    const [currState, setCurrState] = useState('Sign Up');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false); 

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = `${url}/api/user/${currState === "Login" ? "login" : "register"}`;

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                const token = response.data.token; // Get the token from the response
                localStorage.setItem('token', token);
                setToken(token); // Update the context with the new token
                alert(response.data.message);
                setShowLogin(false); // Close the login popup
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("An error occurred: " + error.message); // Improved error handling
        }
    };

    return (
        <div className='login-pop'> 
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder="Name"  
                            required
                        />
                    )}
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder="Email" 
                        required 
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder="Password" 
                        required 
                    />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input 
                        type="checkbox" 
                        checked={agreeToTerms} 
                        onChange={() => setAgreeToTerms(prev => !prev)} // Manage checkbox state
                        required 
                    />
                    <p>I agree to the Terms and Conditions</p>
                </div>
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
