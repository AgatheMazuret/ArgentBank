import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}
// Définition du type "User" un utilisateur avec un prénom, un nom et un email.

interface AuthState {
  token: string | null;
  user: User | null;
  password?: string | null;
  email?: string | null;
  isAuthenticated: boolean;
}
// Définition du type "AuthState" pour modéliser l'état d'authentification, comprenant un token, un utilisateur et un booléen d'authentification.

const initialState: AuthState = {
  token: null,
  user: null,
  password: null,
  email: null,
  isAuthenticated: false,
};

// Création du slice Redux pour la gestion de l'authentification.

// Nom du slice, utilisé pour identifier cette partie de l'état dans Redux.
const authSlice = createSlice({
  name: "auth",
  // L'état initial du slice défini précédemment.
  initialState,

  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      // On stocke le token récupéré après une connexion réussie.
      state.token = action.payload.token;
      // On stocke les informations de l'utilisateur.
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    loginFailure(state) {
      // On réinitialise le token en cas d'échec de connexion.
      state.token = null;
      // On réinitialise les informations de l'utilisateur.
      state.user = null;
      state.isAuthenticated = false;
    },

    // Action pour gérer la déconnexion de l'utilisateur
    logoutUser(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, loginFailure, logoutUser } = authSlice.actions;

// Exportation du reducer pour qu'il soit intégré au store Redux.
export default authSlice.reducer;
