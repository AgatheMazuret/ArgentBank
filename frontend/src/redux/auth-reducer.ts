import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  loggedIn: boolean;
  errorMessage: string | null;
}

const initialState: AuthState = {
  token: null,
  loggedIn: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.loggedIn = true;
      state.errorMessage = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.loggedIn = false;
    },
    logoutUser(state) {
      state.token = null;
      state.loggedIn = false;
      state.errorMessage = null;
    },
  },
});

export const { loginSuccess, loginFailure, logoutUser } = authSlice.actions;
export default authSlice.reducer;
