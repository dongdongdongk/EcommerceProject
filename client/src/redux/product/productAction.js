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
        process.env.REACT_APP_BACKEND_URL +`/product/create-product`,
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
        process.env.REACT_APP_BACKEND_URL +`/product/get-all-products-shop/${id}`
      );
      return data.products;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);


export const getAllProducts = createAsyncThunk (
  "product/getAllProducts",
  async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL +`/product/get-all-products`)
      return data.products
    } catch (error) {
      throw error.response.data.message      
    }
  }
)



export const deleteProduct = createAsyncThunk(
  "product/deleteProduct", async (id) => {

    try {
      const { data } = await axios.delete (process.env.REACT_APP_BACKEND_URL +`/product/delete-shop-product/${id}`,{withCredentials : true} )
      return data.message;
    } catch (error) {
      throw error.response.data.message
    }

  }


)