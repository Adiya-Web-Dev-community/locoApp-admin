import { configureStore } from '@reduxjs/toolkit';
import { APIS } from './api';

const store = configureStore({
  reducer: {
    [APIS.reducerPath]: APIS.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APIS.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;