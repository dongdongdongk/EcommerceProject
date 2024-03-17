import { createSlice } from "@reduxjs/toolkit";
import { createEvent, getAllEventsShop, deleteEvent, getAllEvents, endEvent  } from "./eventAction";

const eventSlice = createSlice({
    name : "event",
    initialState : {
        isLoading : true,
        success: false,
        events : [],
        allEvents : [],
        event : null,
        error: null,
    },
    extraReducers : (builder) => {
    builder
        // 이벤트 생성
        .addCase(createEvent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.event = action.payload;
            state.success = true;
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.success = false;
        })
        // 샵 모든 이벤트 조회
        .addCase(getAllEventsShop.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllEventsShop.fulfilled, (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
        })
        .addCase(getAllEventsShop.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        // 이벤트 삭제 
        .addCase(deleteEvent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        
        // 모든 이벤트 조회
        .addCase(getAllEvents.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allEvents = action.payload;
        })
        .addCase(getAllEvents.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })

        // 이벤트 종료 상태변경
        .addCase(endEvent.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(endEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })
        .addCase(endEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default eventSlice.reducer;

//   clearErrors: (state) => {
//     state.error = null;
//   },