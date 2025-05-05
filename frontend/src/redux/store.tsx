import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-reducer";

export type RootState = {
  auth: {
    loggedIn: boolean;
    login: (
      email: string,
      password: string,
      rememberMe: boolean
    ) => Promise<void>;
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
