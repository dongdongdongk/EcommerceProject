import { createSlice } from "@reduxjs/toolkit";
import { loadUser, clearErrors } from "./userAction";

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