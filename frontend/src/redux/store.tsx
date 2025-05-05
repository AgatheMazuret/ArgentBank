import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-reducer";

export type RootState = {
  auth: {
    loggedIn: boolean;
    name: string;
    email: string;
    token: string | null;
    errorMessage: string | null;
  };
};
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
