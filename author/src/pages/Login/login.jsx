import React from "react";
// import React from 'react'
import { useState } from "react";
import TextFieldComponent from "../../components/Inputs/textField.jsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import './login.css'

function LoginPage() {

  const [login, setLogin] = useState(true);

  const handleLoginTypeChange = () =>{
    if (!login){
      setLogin(true) 
    }
    else{
      setLogin(false)
    }
  }

  return (
    <>
       <div className="login-container">
            <div className="Login_form">
                <div className="internal_box">
                  <div><h2>{login? "Login": "Register"}</h2></div>
                  <div className="input_box">
                    <TextFieldComponent label={"Enter Name"} boxWidth="90%" fullWidth icon={<AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5}}/>}/>
                    <TextFieldComponent label={"Enter Password"} icon={<VisibilityIcon sx={{ color: 'action.active', mr: 1, my: 0.5,}}/>}/>
                  </div>
                  <div className="button_box">
                    <Button variant="contained">Login</Button>
                  </div>
                  <div className="login_register" style={{textAlign:'center'}}><Button variant="text" onClick={handleLoginTypeChange} sx={{fontSize: "clamp(0.5rem, calc(0.5vw + 1rem), 0.8rem)", color:'orangered', fontWeight:'bold'}}>{login ? "Register User": "Login User"}</Button></div>
                </div>
            </div>
       </div>
    </>
  )
}

export default LoginPage