import { authApi } from "@/API/authAPI";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { injectStore } from "@/API/baseQuery";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

injectStore(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
