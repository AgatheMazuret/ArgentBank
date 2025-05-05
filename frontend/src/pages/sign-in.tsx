import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/auth-actions";
import { AppDispatch } from "../redux/store";

const SignInPage = () => {
  // Définition des états locaux pour stocker l'email, le mot de passe et l'état de "remember me"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Utilisation de useDispatch pour dispatcher les actions Redux
  const dispatch = useDispatch<AppDispatch>();
  // Utilisation de useNavigate pour gérer la navigation après une connexion réussie
  const navigate = useNavigate();
  // Sélection de l'état d'erreur de l'authentification depuis le store Redux
  const errorMessage = useSelector(
    (state: RootState) => state.auth.errorMessage
  );

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      // Envoie les informations de connexion (email, mot de passe et "remember me") via Redux
      console.log("Dispatching login action...");
      await dispatch(login(email, password, rememberMe));

      // Vérifie si le token a été correctement stocké dans localStorage ou sessionStorage
      const token = rememberMe
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");

      console.log("Token trouvé :", token);
      if (token) {
        console.log("Token trouvé, navigation vers /user");
        navigate("/user");
      } else {
        console.log("Aucun token trouvé.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="./src/assets/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      </nav>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {errorMessage && (
              <p className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignInPage;
