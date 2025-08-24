import axios from "axios";
import React from "react";
import {createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";

const postData = createAsyncThunk(
    'user/postData',
    async(data, {isReisRejectedWithValue}) =>
    {
        try{
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', data)
            return res.data
        }
        catch (err){
            return isReisRejectedWithValue(err.message)
        }   
    }
)

export default postData