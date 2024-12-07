import { createSlice } from "@reduxjs/toolkit";
const storySlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    selectedStory: null,
    myStory: null,
    count: 0,
  },
  reducers: {
    // actions--
    setStories: (state, action) => {
      state.stories = action.payload;
    },
    setSelectedStory: (state, action) => {
      state.selectedStory = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setMyStory: (state, action) => {
      state.myStory = action.payload;
    },
  },
});
export const { setStories, setSelectedStory, setCount, setMyStory } =
  storySlice.actions;
export default storySlice.reducer;
