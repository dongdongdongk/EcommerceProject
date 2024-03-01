import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const clearErrors = createAsyncThunk("user/clearErrors", async () => {
  return null;
});

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v2/user/getuser`,
      {
        withCredentials: true,
      }
    );
    return data.user;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const loadSeller = createAsyncThunk("user/loadSeller", async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v2/shop/getSeller`,
      {
        withCredentials: true,
      }
    );
    return data.seller;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const updateUserInformation = createAsyncThunk(
  "user/updateUserInformation",
  async ({ name, email, phoneNumber, password }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v2/user/update-user-info`,
        { name, email, phoneNumber, password },
        {
          withCredentials: true,
        }
      );
      return data.user;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async ({ country, city, address1, address2, zipCode, addressType }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v2/user/update-user-addresses`,
        { country, city, address1, address2, zipCode, addressType },
        {
          withCredentials: true,
        }
      );
      return {
        successMessage: "주소 등록이 완료되었습니다!",
        user: data.user,
      };
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "user/deleteUserAddress",
  async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v2/user/delete-user-address/${id}`,
        {
          withCredentials: true,
        }
      );
      return {
        successMessage: "주소 삭제가 완료되었습니다!",
        user: data.user,
      };
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
