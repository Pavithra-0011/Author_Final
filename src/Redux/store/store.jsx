import react from 'react'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/slice'

const store = configureStore({
    reducer : {
        user : userReducer, 
    }
})  

export default store