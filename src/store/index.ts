import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import bookmarkReducer from "@/store/bookmark/bookmarkSlice";
import bookmarkNotificationReducer from "./bookmark/bookmarkNotificationSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  bookmark: bookmarkReducer,
  bookmarkNotification: bookmarkNotificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
