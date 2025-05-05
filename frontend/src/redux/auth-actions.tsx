// src/redux/actions/auth-actions.ts
import { loginSuccess } from "../auth-reducer";
import { Dispatch } from "redux";
import { createAction } from "@reduxjs/toolkit";

export const loginAction = createAction<{
  email: string;
  password: string;
  rememberMe: boolean;
}>("login");

export const login =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Réponse de l'API:", data); // Ajoute ce log pour voir ce que contient la réponse

      if (response.ok && data.body.token) {
        const token = data.body.token;

        // ✅ Stockage du token
        if (rememberMe) {
          localStorage.setItem("token", token);
          console.log("Token stocké dans localStorage");
        } else {
          sessionStorage.setItem("token", token);
          console.log("Token stocké dans sessionStorage");
        }

        const user = data.body.user;
        dispatch(loginSuccess({ token, user }));
      } else {
        console.error("Erreur de connexion :", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

// Action de déconnexion
export const logoutUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  return {
    type: "LOGOUT_USER",
  };
};
