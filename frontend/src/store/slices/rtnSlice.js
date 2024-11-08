import { createSlice } from "@reduxjs/toolkit";
const rtnSlice = createSlice({
  name: "realTimeNotifications",
  initialState: {
    likeNotifications: [],
    messageNotifications: [],
  },
  reducers: {
    setLikeNotifications: (state, action) => {
      if (action.payload.type === "like") {
        state.likeNotifications.push(action.payload);
      } else if (action.payload.type === "dislike") {
        state.likeNotifications = state.likeNotifications.filter(
          (item) => item._id != action.payload._id
        );
      }
    },
    setMessageNotifications: (state, action) => {
      state.messageNotifications.push(action.payload);
    },
    clearLikeNotifications: (state) => {
      state.likeNotifications = [];
    },
    clearMessageNotifications: (state) => {
      state.messageNotifications = [];
    },
  },
});

export const {
  setLikeNotifications,
  setMessageNotifications,
  clearLikeNotifications,
  clearMessageNotifications,
} = rtnSlice.actions;
export default rtnSlice.reducer;
