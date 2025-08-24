import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const postData = createAsyncThunk(
  "user/postData",
  async ({ data, file}, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("genre", data.genre);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("pdf", file); 

      
      const res = await axios.post(
        "https://author-book-u7or.onrender.com/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export default postData;
