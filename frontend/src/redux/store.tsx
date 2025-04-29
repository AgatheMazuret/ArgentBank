import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth-reducer";

export type RootState = {
  user: {
    loggedIn: boolean;
    name: string; // Add the 'name' property
  };
};
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
