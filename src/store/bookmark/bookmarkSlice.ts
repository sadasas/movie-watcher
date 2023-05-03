import { IMovie } from "@/models/movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IMovie[] = [];

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: { value: initialState },
  reducers: {
    addBookmark: (
      state: { value: IMovie[] },
      action: PayloadAction<IMovie>
    ) => {
      if (action.payload.id === "") return;
      state.value.push({ ...action.payload });
    },
    removeBookmark: (
      state: { value: IMovie[] },
      action: PayloadAction<string>
    ) => {
      if (action.payload === "") return;
      const uBookmarks = state.value.filter(
        (movie) => movie.id !== action.payload
      );
      state.value = uBookmarks;
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
