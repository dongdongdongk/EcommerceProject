import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const clearErrors = createAsyncThunk('seller/clearErrors', async () => {
  return null;
});

export const loadSeller = createAsyncThunk('seller/loadSeller', async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/v2/shop/getSeller`, {
      withCredentials: true,
    });
    return data.seller;
  } catch (error) {
    throw error.response.data.message;
  }
});