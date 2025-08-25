import React from "react";
// import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "../../components/Inputs/textField.jsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import './login.css'

function LoginPage() {


  const [login, setLogin] = useState(true);
  const [userdata, setUserData ] = useState({
    username: '',
    password: '',
  })
  const [message, setMessage] = useState("")
  const navigate = useNavigate();

  const users = [
    { name: "Pavithra Sivakumar", password: "pass123" },
    { name: "Author2", password: "pass222" }
  ];

  const handleLoginTypeChange = () =>{
    if (!login){
      setLogin(true) 
    }
    else{
      setLogin(false)
    }
  }

  const handleLogin = () => {
  if (login) {
    const user = users.find(
      u => u.name === userdata.username && u.password === userdata.password
    );
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(userdata));
      navigate("/welcomepage/uploadbook", { state: { user: user.name } });
    } else {
      setMessage("Invalid username or password");
    }
  } else {
    setMessage("Registration not implemented in hard-coded version");
  }
};



  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <>
       <div className="login-container">
            <div className="Login_form">
                <div className="internal_box">
                  <div><h2>{login? "Login": "Register"}</h2></div>
                  <div className="input_box">
                    <TextFieldComponent label={"Enter Name"} boxWidth="90%" fullWidth icon={<AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5}}/>} value={userdata.username}   onChange={(e) => setUserData({...userdata, username: e.target.value})}/>
                    <TextFieldComponent label={"Enter Password"} icon={<VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 0.5,}}/>} value={userdata.password}   onChange={(e) => setUserData({...userdata, password: e.target.value})}/>
                  </div>
                  <div className="button_box">
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                  </div>
                    <p style={{color:'red', textAlign:'center', fontSize:'12px'}}>{message}</p>
                  <div className="login_register" style={{textAlign:'center'}}><Button variant="text" onClick={handleLoginTypeChange} sx={{fontSize: "clamp(0.5rem, calc(0.5vw + 1rem), 0.8rem)", color:'orangered', fontWeight:'bold'}}>{login ? "Register User": "Login User"}</Button></div>
                </div>
            </div>
       </div>
    </>
  )
}

export default LoginPage