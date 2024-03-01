import { createSlice } from "@reduxjs/toolkit";
import {
  loadUser,
  clearErrors,
  updateUserInformation,
  updateUserAddress,
  deleteUserAddress,
} from "./userAction";

const userSlice = createSlice({
  name: "user",
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
      })

      //유저 정보 업데이트
      .addCase(updateUserInformation.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //유저 주소 업데이트
      .addCase(updateUserAddress.pending, (state) => {
        state.addressLoading = true;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.successMessage = action.payload.successMessage;
        state.user = action.payload.user;
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.error = action.payload;
      })

      // 유저 주소 삭제
      .addCase(deleteUserAddress.pending, (state) => {
        state.addressLoading = true;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.successMessage = action.payload.successMessage;
        state.user = action.payload.user;
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.error = action.payload;
      })
  },
});

export default userSlice.reducer;
