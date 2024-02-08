import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const clearErrors = createAsyncThunk('user/clearErrors', async () => {
  return null;
});

export const loadUser = createAsyncThunk('user/loadUser', async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/v2/user/getuser`, {
      withCredentials: true,
    });
    console.log(data.user)
    return data.user;
  } catch (error) {
    throw error.response.data.message;
  }
});