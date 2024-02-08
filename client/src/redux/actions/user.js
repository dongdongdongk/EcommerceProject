// 예시: actions.js 파일 내
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loadUser = createAsyncThunk('user/loadUser', async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v2/user/getuser`, {
        withCredentials: true,
      });
  
      return data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  });


const userSlice = createSlice({
    name: 'user',
    initialState: {
      isAuthenticated: false,
      loading: false,
      user: null,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(loadUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.isAuthenticated = false;
        })
        .addCase(clearErrors.fulfilled, (state) => {
          state.error = null;
        });
    },
  });
  
  export default userSlice.reducer;