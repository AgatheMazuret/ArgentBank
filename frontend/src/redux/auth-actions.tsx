// src/redux/actions/auth-actions.ts
import { loginSuccess, logout } from "../auth-reducer";
import { Dispatch } from "redux";

// Action de connexion
export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess({ token: data.token, user: data.user }));
      } else {
        console.error("Erreur de connexion :", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

// Action de déconnexion
export const logoutUser = () => (dispatch: Dispatch) => {
  dispatch(logout());
};
