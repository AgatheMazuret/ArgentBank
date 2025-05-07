import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./auth-reducer";

export type RootState = {
  auth: AuthState;
};
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Ajouter un listener pour mettre à jour le store lors de la mise à jour des informations utilisateur
store.subscribe(() => {
  const state = store.getState();
  if (state.auth.user) {
    console.log("Profil utilisateur mis à jour :", state.auth.user);
  }
});

export type AppDispatch = typeof store.dispatch;

export default store;
