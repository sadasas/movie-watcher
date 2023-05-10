import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import bookmarkReducer from "@/features/bookmark/bookmarkSlice";
import bookmarkNotificationReducer from "@/features/bookmark/bookmarkNotificationSlice";
import popupTrailerReducer from "@/features/popup/popupTrailerSlice";

const rootReducer = combineReducers({
  bookmark: bookmarkReducer,
  bookmarkNotification: bookmarkNotificationReducer,
  popupTrailer: popupTrailerReducer,
});

export const store = configureStore({
  reducer: {
    reducer: rootReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
