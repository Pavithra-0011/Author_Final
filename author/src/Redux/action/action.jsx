import axios from "axios";
import React from "react";
import {createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";

const postData = createAsyncThunk(
    'user/postData',
    async(data, {isReisRejectedWithValue}) =>
    {
        try{
            const res = await axios.post('https://author-book-u7or.onrender.com', data)
            console.log(res.data)
            return res.data
        }
        catch (err){
            return isRejectedWithValue(err.message)
        }   
    }
)

export default postData