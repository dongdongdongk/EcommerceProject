import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 이벤트 생성
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (newForm) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(process.env.REACT_APP_BACKEND_URL +`/event/create-event`,newForm, config);
      return data.event;
    } catch (error) {
        throw error.response.data.message;
    }
  }
);


// 샵 모든 이벤트
export const getAllEventsShop = createAsyncThunk(
    "event/getAllEventsShop",
    async (id) => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL +`/event/get-all-events/${id}`);
            return data.events
        } catch (error) {
            throw error.response.data.message;
        }
    }
);

// 모든 이벤트 

export const getAllEvents = createAsyncThunk(
    "event/getAllEvents",
    async() => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL +`/event/get-all-events`);
            return data.events
        } catch (error) {
            throw error.response.data.message;
        }
    }
)


// 삭제 이벤트 
export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (id) => {
        try {
            const { data } = await axios.delete(process.env.REACT_APP_BACKEND_URL +`/event/delete-shop-event/${id}`, { withCredentials: true, })
            return data.message
        } catch (error) {
            throw error.response.data.message;
        }
    }
)


// 이벤트 종료 상태변경
export const endEvent = createAsyncThunk(
    "event/endEvent",
    async (id) => {
      try {
        const { data } = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/event/end-event/${id}`);
        return data.message;
      } catch (error) {
        throw error.response.data.message;
      }
    }
  );
