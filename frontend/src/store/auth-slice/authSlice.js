

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// Create an Axios instance with dynamic baseURL
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "api",
  withCredentials: true,
});

// Register
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await api.post("/auth/register", formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Login
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await api.post("/auth/login", formData, {
    withCredentials: true,
  });
  return response.data;
});

// Check Authentication
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await api.get("/auth/check-auth", {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
  return response.data;
});

// Logout
export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await api.get("/auth/logout", {
    withCredentials: true,
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
