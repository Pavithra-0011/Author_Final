import React from 'react'
import { useState, useEffect } from 'react';
import book_logo from '../../assets/book_logo.png'
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './layout.css'

function Layout() {

    const navigate = useNavigate

    const [dashboard, setDashboard] = useState({
        dashboard: true,
        uploadbook: false
    })

    const [authorName, setAuthorName] = useState("")
    useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setAuthorName(storedUser.username);
    }
  }, []);


const handleDashboardClick = () => {
  setDashboard((prev) => ({
    dashboard: true,       
    uploadbook: false      
  }));
};

const handleUploadBookClick = () => {
  setDashboard((prev) => ({
    dashboard: false,
    uploadbook: true       
  }));
};
    

  return (
    <>
    <div className='Layout'>
        <div className='navigation'>
            <div className='logo'>
                <img src={book_logo}/>
                <h4>{authorName}</h4>
            </div>
            <nav>
                <ul>
                    <li><Link to="dashboard" style={{borderBottom: dashboard.dashboard ? '3px solid blue'  : 'none'}} onClick={handleDashboardClick}>DASHBOARD</Link></li>
                    <li><Link to="uploadbook" style={{borderBottom: dashboard.uploadbook ? '3px solid blue' : 'none'}} onClick={handleUploadBookClick}>UPLOAD BOOK</Link></li>
                </ul>
            </nav>
        </div>
        <div className='main_content'>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Layout