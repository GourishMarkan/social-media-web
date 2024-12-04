import { createSlice } from "@reduxjs/toolkit";
const storySlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    selectedStory: null,
  },
  reducers: {
    // actions--
    setStories: (state, action) => {
      state.stories = action.payload;
    },
    setSelectedStory: (state, action) => {
      state.selectedStory = action.payload;
    },
  },
});
export const { setStories, setSelectedStory } = storySlice.actions;
export default storySlice.reducer;
