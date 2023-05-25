import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      email,
      password,
    };
    console.log(obj);
    fetch('http://localhost:5000/login',{
      method:'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type':'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        navigate('/home')
      })
      .catch((err) => console.log(err));
  };


  const emailHandle = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandle = (e) => {
    setPassword(e.target.value);
  };
  const toggleLogin=()=>{
    navigate('/')
  }

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={emailHandle}
        />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={passwordHandle}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={toggleLogin}>New User!! Consider Sign up</button>
    </React.Fragment>
  );
};

export default Signup;
