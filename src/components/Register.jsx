import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Login() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [last_name,setLast_name] = useState('')
    const [first_name,setFirst_name] = useState('')

    

    const API = 'http://localhost:8000/api/register/';

    const handleLogin = async () =>{
        const res = await axios.post(API,
            {
                first_name:first_name,
                last_name:last_name,
                username:username,
                email:email,
                password:password
            });


        console.log(res.data);
    }

  return (
    <> 
  <h1>Register</h1>
    <input type="first_name" name='first_name' placeholder='first_name' value={first_name} onChange={(e)=>setFirst_name(e.target.value)} />
    <br />
    <br />

    <input type="last_name" name='last_name' placeholder='last_name' value={last_name} onChange={(e)=>setLast_name(e.target.value)} />
    <br />
    <br />

    <input type="email" name='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
    <br />
     <br />
    <input type="username" name='username' placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
   
    <br />
    <br />
    <input type="password" name='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
    <br />
    <br />

    <button onClick={handleLogin}>Register</button>
    <br />  
    <Link to='/login'>already have an account ? Login </Link>
    </>
  )
}

export default Login