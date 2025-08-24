import React from "react";
import {createSlice} from "@reduxjs/toolkit";
import postData from "../action/action";




const initialState = {
    data: [],
    isLoading: false,
    error: null,
    value: null
}

const userSlice = createSlice({
    name: 'user',
    reducers :{},
    initialState : initialState,
    extraReducers : (builder) =>{
        builder
        .addCase(postData.pending, (state)=>{
            state.isLoading = true
            state.error = false

        })
        .addCase(postData.fulfilled, (state, {payload}) =>{
            state.isLoading = false
            state.data = payload
            state.error = false
            state.value = "Data post successfully"
        })
        .addCase(postData.rejected, (state, {payload})=>{
            state.isLoading = false
            state.error = payload
            // state.value = null
        })

    },
})

export default userSlice.reducer
