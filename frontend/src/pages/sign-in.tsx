import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/auth-actions";
import { AppDispatch } from "../redux/store";

// Documentation ajoutée pour clarifier les responsabilités et les comportements du composant SignInPage.
// Ce composant gère l'authentification des utilisateurs.
// Il capture les entrées utilisateur pour l'email et le mot de passe, et gère l'option "Se souvenir de moi".
// Les utilisateurs connectés sont redirigés automatiquement vers leur page de profil.

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Sélecteurs pour obtenir l'état de l'authentification et les messages d'erreur
  const isAuthenticated = useSelector((state: RootState) => state.auth.token);
  const errorMessage = useSelector(
    (state: RootState) => state.auth.errorMessage
  );

  // Vérification de l'authentification à chaque rendu de la page
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Utilisateur déjà connecté, redirection vers /user");
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login(email, password, rememberMe));
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
