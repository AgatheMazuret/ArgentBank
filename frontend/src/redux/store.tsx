import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../auth-reducer";

// Typage de l'état global du store
export interface RootState {
  auth: AuthState;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
