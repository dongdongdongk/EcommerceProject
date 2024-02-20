import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const clearErrors = createAsyncThunk('product/clearErrors', async () => {
  return null;
});

// create product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (newForm) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        `http://localhost:5000/api/v2/product/create-product`,
        newForm,
        config
      );
      return data.product;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

// get All Products of a shop
export const getAllProductsShop = createAsyncThunk(
  "product/getAllProductsShop",
  async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v2/product/get-all-products-shop/${id}`
      );
      return data.products;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
