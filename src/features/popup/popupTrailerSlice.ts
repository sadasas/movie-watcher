import { ITrailer } from "@/models/movie";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ITrailer = {
  id: "",
  trailer: "",
};

const popupTrailerSlice = createSlice({
  name: "popupTrailer",
  initialState: { value: initialState, isActive: false },
  reducers: {
    togglePopup: (
      state: { value: ITrailer; isActive: boolean },
      action: PayloadAction<ITrailer>
    ) => {
      if (action.payload.id === undefined) return;
      state.value = action.payload;
      state.isActive = true;
    },
    closePopup: (state: { value: ITrailer; isActive: boolean }) => {
      state.isActive = false;
    },
  },
});

export const { togglePopup, closePopup } = popupTrailerSlice.actions;

export default popupTrailerSlice.reducer;
