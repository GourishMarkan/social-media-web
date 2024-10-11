import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: userSlice,
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
