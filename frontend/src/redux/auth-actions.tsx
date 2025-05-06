// src/redux/actions/auth-actions.ts
import { loginSuccess } from "../auth-reducer";
import { Dispatch } from "redux";
import { createAction } from "@reduxjs/toolkit";

// Création d'une action 'loginAction' qui contient l'email, le mot de passe et l'état "rememberMe".
export const loginAction = createAction<{
  email: string;
  password: string;
  rememberMe: boolean;
}>("login");

export const login =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await fetch("http://localhost:5173/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Réponse de l'API:", data);

      if (response.ok && data.body.token) {
        // Si la réponse est OK et qu'un token est présent dans la réponse, on le traite.
        const token = data.body.token;

        //  Stockage du token
        if (rememberMe) {
          // Si "rememberMe" est vrai, on stocke le token dans le localStorage.
          localStorage.setItem("token", token);
          console.log("Token stocké dans localStorage");
        } else {
          // Sinon, on le stocke dans le sessionStorage.
          sessionStorage.setItem("token", token);
          console.log("Token stocké dans sessionStorage");
        }

        // Récupération des informations utilisateur à partir de la réponse de l'API.
        const user = data.body.user;
        // Déclenche l'action 'loginSuccess' pour mettre à jour le store avec les informations de l'utilisateur et le token.
        dispatch(loginSuccess({ token, user }));
      } else {
        console.error("Erreur de connexion :", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

export const logoutUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  return {
    // Retourne une action avec le type "LOGOUT_USER" pour signaler une déconnexion dans le store.
    type: "LOGOUT_USER",
  };
};
