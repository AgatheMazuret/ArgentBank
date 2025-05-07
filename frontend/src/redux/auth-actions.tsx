import { loginUser } from "../api/api";
import { loginSuccess, logoutUser as logoutUserAction } from "./auth-reducer";
import { Dispatch } from "redux";

export const login =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch) => {
    try {
      const data = await loginUser(email, password);

      if (data.body.token) {
        const token = data.body.token;
        const user = data.body.user;

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        dispatch(loginSuccess({ token, user }));
      } else {
        console.error("Erreur de connexion :", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

export const updateUserProfile = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) throw new Error("Aucun token trouvé");

  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (!response.ok) {
    console.error("Erreur lors de la mise à jour du profil");
    throw new Error("Erreur lors de la mise à jour du profil");
  }

  const data = await response.json();
  console.log("Réponse de la mise à jour du profil :", data);
  return data.body;
};

// Action Redux pour mettre à jour le profil utilisateur
export const updateUserProfileAction =
  (firstName: string, lastName: string) => async (dispatch: Dispatch) => {
    try {
      const data = await updateUserProfile({ firstName, lastName });

      // Dispatcher l'action pour mettre à jour le profil dans le store
      dispatch({
        type: "UPDATE_PROFILE_SUCCESS",
        payload: data, // Mettre à jour avec les nouvelles données
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  dispatch(logoutUserAction());
};
