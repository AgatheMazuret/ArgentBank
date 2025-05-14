import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logoutUser, fetchUserProfile } from "../redux/auth-reducer";
import { updateUserProfileAction } from "../redux/auth-actions";

// Documentation ajoutée pour clarifier les responsabilités et les comportements du composant UserHomePage.
// Ce composant permet à l'utilisateur de visualiser et de modifier ses informations personnelles.
// Il gère également la déconnexion et la récupération automatique des données utilisateur mises à jour.
// Les états locaux contrôlent l'édition des informations et l'affichage des menus déroulants.

// Cette page permet à l'utilisateur de visualiser et de modifier ses informations personnelles.
// Les effets sont utilisés pour gérer les interactions avec le DOM et les données utilisateur, comme la récupération automatique du profil.
// La gestion des états locaux permet de contrôler l'édition des informations et la déconnexion.

export const UserHomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, token } = useSelector((state: RootState) => state.auth);
  const { firstName, lastName, email } = user || {};

  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false); // Ajout d'un état pour suivre la déconnexion

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!token && !isLoggedOut) {
      console.error("Aucun token trouvé. Redirection vers la page de login.");
      navigate("/sign-in");
      return;
    }
  }, [navigate, token, isLoggedOut]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Récupération automatique des données utilisateur mises à jour
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const firstName = data.firstName as string;
    const lastName = data.lastName as string;

    await dispatch(updateUserProfileAction(firstName, lastName));

    // Mettre à jour immédiatement l'état local pour refléter les changements
    dispatch({
      type: "auth/fetchUserProfile/fulfilled",
      payload: { ...user, firstName, lastName },
    });

    setIsEditing(false);
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
    setIsLoggedOut(true); // Marque l'utilisateur comme déconnecté
    navigate("/"); // Redirige vers la page d'accueil
  }; // Ajout de l'accolade manquante

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
        <div>
          <div
            className="main-nav-item user-dropdown"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}
          >
            <i className="fa fa-user-circle"></i>
            {firstName}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p>
                  <strong>Nom:</strong> {lastName}
                </p>
                <p>
                  <strong>Prénom:</strong> {firstName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
              </div>
            )}
          </div>
          <Link to="/" className="sign-out-button" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign out
          </Link>
        </div>
      </nav>

      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <input name="firstName" type="text" placeholder="John" />
              <input name="lastName" type="text" placeholder="Doe" />
              <button className="save-name-button" type="submit">
                Save
              </button>
              <button
                className="cancel-name-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              className="edit-button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit Name
            </button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserHomePage;
