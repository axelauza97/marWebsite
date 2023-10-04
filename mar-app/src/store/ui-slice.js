import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: {
      state: null,
      title: null,
      message: null,
      show: false,
    },
  },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
        show: true,
      };
    },
    hideNotification(state, action) {
      state.notification = {
        ...state.notification,
        show: false,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
