import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('userData')) || null,
  isAuthenticated: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userData');
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
