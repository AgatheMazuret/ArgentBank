import { loginSuccess } from "../auth-reducer";
import { Dispatch } from "redux";

type Account = {
  type: string;
  balance: number;
};

export const getUserProfile = async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    console.error("Token non trouvé dans localStorage");
    throw new Error("Token non trouvé dans le stockage local");
  }

  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Erreur lors de la récupération du profil utilisateur");
    throw new Error("Erreur lors de la récupération du profil utilisateur");
  }

  const data = await response.json();
  console.log("Données du profil utilisateur :", data);
  return data.body;
};

export const getUserAccounts = async (): Promise<Account[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token non trouvé dans localStorage");
    throw new Error("Token non trouvé");
  }

  const response = await fetch("http://localhost:3001/api/v1/user/accounts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Erreur lors de la récupération des comptes");
    throw new Error("Erreur lors de la récupération des comptes");
  }

  const data = await response.json();
  console.log("Données des comptes utilisateur :", data);
  return data.body.accounts;
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    console.error("Erreur lors de la connexion");
    throw new Error("Erreur lors de la connexion");
  }

  const data = await response.json();
  console.log("Réponse de la connexion :", data);
  return data;
};

export const loginUserAction =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    navigate: (path: string) => void
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const data = await loginUser(email, password);

      if (data.body && data.body.token) {
        const token = data.body.token;
        const user = data.body.user;

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        dispatch(loginSuccess({ token, user }));

        navigate("/user");
      } else {
        console.error("Erreur de connexion :", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };
