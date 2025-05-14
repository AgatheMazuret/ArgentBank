type Account = {
  type: string;
  balance: number;
};

// Fonction pour récupérer le profil utilisateur
// Elle utilise un token stocké dans localStorage ou sessionStorage pour s'authentifier
// Effectue une requête POST à l'API pour obtenir les données du profil
// En cas d'erreur, elle affiche un message d'erreur et lève une exception
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

// Fonction pour récupérer les comptes utilisateur
// Elle utilise un token stocké dans localStorage pour s'authentifier
// Effectue une requête GET à l'API pour obtenir les comptes
// En cas d'erreur, elle affiche un message d'erreur et lève une exception
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

// Fonction pour connecter un utilisateur
// Elle envoie les informations d'identification (email et mot de passe) à l'API
// Effectue une requête POST pour obtenir un token d'authentification
// En cas d'erreur, elle affiche un message d'erreur et lève une exception
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

// Fonction d'action pour gérer la connexion utilisateur
// Elle utilise la fonction loginUser pour effectuer la connexion
// Stocke le token dans localStorage ou sessionStorage selon l'option "rememberMe"
// Redirige l'utilisateur vers la page utilisateur après une connexion réussie
// En cas d'erreur, elle affiche un message d'erreur réseau
export const loginUserAction =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    navigate: (path: string) => void
  ) =>
  async () => {
    try {
      const data = await loginUser(email, password);

      if (data.body && data.body.token) {
        const token = data.body.token;

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        navigate("/user");
      } else {
        console.error("Erreur de connexion :", data.message);
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };
