import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postSlice from "./slices/postSlice";
import socketSlice from "./slices/socketSlice";
import chatSlice from "./slices/chatSlice";
import rtn from "./slices/rtnSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: userSlice,
  post: postSlice,
  socketio: socketSlice,
  chat: chatSlice,
  realTimeNotifications: rtn,
});
// creating a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializeCheck: {
        ignoredActions: [
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
          "persist/PERSIST",
          "persist/PAUSE",
          "persist/REHYDRATE",
        ],
      },
    }),
});
export default store;
