import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-reducer";

export type RootState = {
  user: {
    loggedIn: boolean;
  };
};
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
