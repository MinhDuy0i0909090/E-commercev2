import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "api",
  withCredentials: true,
});
export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const result = await api.post("/admin/products/add", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result?.data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProduct",
  async () => {
    const result = await api.get("/admin/products/get");

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await api.put(`/admin/products/edit/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await api.delete(`/admin/products/delete/${id}`);

    return result?.data;
  }
);
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
