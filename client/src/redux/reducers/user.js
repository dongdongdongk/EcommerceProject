import { createReducer } from "@reduxjs/toolkit";
import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, CLEAR_ERRORS } from '../actions/user'; 

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOAD_USER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(LOAD_USER_SUCCESS, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(LOAD_USER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(CLEAR_ERRORS, (state) => {
      state.error = null;
    });
});
