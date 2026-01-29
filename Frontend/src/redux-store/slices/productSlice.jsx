import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getProduct = createAsyncThunk(
  "product/get",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${backendUrl}/api/product/list`
      );

      if (!res.data.success) {
        return rejectWithValue(res.data.msg || "Something went wrong");
      }

      return res.data.products;
    } catch (e) {
      return rejectWithValue(
        e.res?.data?.msg || "Server Error"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    error: "",
    successMsg: "",
  },
  reducers: {
    clearProdMsg: (state) => {
      state.error = "";
      state.successMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProdMsg } = productSlice.actions;
export default productSlice.reducer;
