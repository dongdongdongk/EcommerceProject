import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 이벤트 생성
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (newForm) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(`http://localhost:5000/api/v2/event/create-event`,newForm, config);
      return data.event;
    } catch (error) {
        throw error.response.data.message;
    }
  }
);


// 모든 이벤트
export const getAllEventsShop = createAsyncThunk(
    "event/getAllEventsShop",
    async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/v2/event/get-all-events/${id}`);
            return data.events
        } catch (error) {
            throw error.response.data.message;
        }
    }
);


// 삭제 이벤트 
export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/v2/event/delete-shop-event/${id}`, { withCredentials: true, })
            return data.message
        } catch (error) {
            throw error.response.data.message;
        }
    }
)

