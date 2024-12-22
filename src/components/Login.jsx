import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]); // To store error messages from backend

  const navigate = useNavigate()


  const API = "http://localhost:8000/api/login/";

  const handleLogin = async () => {
    try {
      const res = await axios.post(API, {
        email: email,
        password: password,
      });
  
      const { access, refresh } = res.data.data.token;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
  
      console.log(res.data);

        navigate('/accounts')
      
      alert(`${res.data.message} : Loggin success....`)
    } catch (error) {
      if (error.response) {
        // Backend returned an error response
        console.log("Error Response:", error.response.data.message);
        const { message, errors } = error.response.data;
  
        // Log or set the error messages to state for display
        console.error("Message:", message);
        console.error("Errors:", errors);
        alert(`${error.response.data.message}: user is not verifyed till now..`)
      } else {
        // Network or unexpected errors
        console.error("Unexpected Error:", error.message);
      }
    }
  };
  

  return (
    <>
    <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>

      <br />
      <Link to='/'>Don't have an account ? Register</Link>

      {/* Display error messages */}
      {errors.length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );    
}

export default Login;
