import { loginUser } from "../api/api";
import { loginSuccess } from "../auth-reducer";
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

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
