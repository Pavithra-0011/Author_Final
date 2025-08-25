import { useState } from 'react'
import LoginPage from './pages/Login/login.jsx'
import Layout from './components/Layout/layout.jsx'
import UploadBook from './pages/Updload/upload.jsx'
import {Routes, Route} from 'react-router-dom'
import DashboardPage from './pages/DashBoard/dashboard.jsx'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path ='welcomepage' element={<Layout/>}>
          <Route path='dashboard' element={<DashboardPage/>}/>
          <Route path='uploadbook' element={<UploadBook/>}/>
        </Route>
      </Routes>
      {/* <DashboardPage/> */}
    </>
  )
}

export default App
