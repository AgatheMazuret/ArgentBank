import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  token: null,
  user: null,
  isAuthenticated: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errorMessage = null;
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
});

export const { loginSuccess, loginFailure, logoutUser } = authSlice.actions;
export default authSlice.reducer;
