import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./auth-reducer";

// Le store Redux centralise l'état global de l'application, facilitant la gestion et le partage des données entre les composants.
// La configuration du store inclut le reducer d'authentification pour gérer l'état lié à l'utilisateur.
// Un listener est ajouté pour surveiller les mises à jour du store et effectuer des actions spécifiques, comme le suivi des modifications du profil utilisateur.

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

// Typage du Dispatch
export type AppDispatch = typeof store.dispatch;

export default store;
