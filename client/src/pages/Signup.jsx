import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  if (token) {
    navigate("/");
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://imdb-clone-ow4p.onrender.com/api/auth/signup", {
        name,
        email,
        password,
      });
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <input 
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
