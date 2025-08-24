import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const postData = createAsyncThunk(
  "user/postData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://author-book-u7or.onrender.com/submit",data
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export default postData;
