import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition du type pour l'état
export interface AuthState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
}

// État initial
const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

// Création du slice d'authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: string;
        user: { id: string; name: string; email: string };
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Exportation des actions
export const { loginSuccess, logout } = authSlice.actions;

// Exportation du reducer
export default authSlice.reducer;
