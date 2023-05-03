import { defaultValueMovie, IMovie } from "@/models/movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const bookmarkNotificationSlice = createSlice({
  name: "bookmarkNotification",
  initialState: { value: false },
  reducers: {
    setNotificationBookmark: (
      state: { value: boolean },
      action: PayloadAction<boolean>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setNotificationBookmark } = bookmarkNotificationSlice.actions;

export default bookmarkNotificationSlice.reducer;
