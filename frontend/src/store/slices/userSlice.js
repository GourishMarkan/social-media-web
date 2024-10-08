import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
});
