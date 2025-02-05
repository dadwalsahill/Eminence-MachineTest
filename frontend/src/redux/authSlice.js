import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true"); // Persist login state in localStorage
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn"); // Clear on logout
      }
    },
    setLoginState: (state) => {
      if (typeof window !== "undefined") {
        state.isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Access localStorage only in client-side
      }
    },
  },
});

export const { login, logout, setLoginState } = authSlice.actions;
export default authSlice.reducer;
