import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../api/api";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  errorMessage: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: false,
  errorMessage: null,
};

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const userProfile = await getUserProfile();
      return userProfile;
    } catch {
      return rejectWithValue(
        "Erreur lors de la récupération du profil utilisateur"
      );
    }
  }
);

// Ajout d'un case reducer pour gérer fetchUserProfile
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errorMessage = null;

      localStorage.setItem("token", action.payload.token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.errorMessage = action.payload;
    },
    logoutUser(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.errorMessage = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.errorMessage = action.payload as string;
      });
  },
});

export const { loginSuccess, loginFailure, logoutUser } = authSlice.actions;
export type { AuthState };
export default authSlice.reducer;
