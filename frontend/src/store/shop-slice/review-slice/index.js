import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "api",
  withCredentials: true,
});
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    const response = await api.post(`/shop/review/add`, formdata);

    return response.data;
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await api.get(`/shop/review/${id}`);
  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
