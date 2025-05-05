import "../index.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth-actions";

export const UserHomePage = () => {
  // État pour gérer le nom de l'utilisateur
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("Tony Jarvis");

  // Fonction pour gérer le changement de nom
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Fonction pour valider et envoyer la modification
  const handleSaveName = () => {
    // Logique de sauvegarde du nouveau nom (par exemple, appeler une API ou mettre à jour l'état global)
    console.log("New name saved:", newName);
    setIsEditing(false); // Ferme le formulaire d'édition
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
        <div>
          <a className="main-nav-item" href="./user.html">
            <i className="fa fa-user-circle"></i>
            {newName.split(" ")[0]} {/* Affiche seulement le prénom */}
          </a>
          <Link to="/" className="sign-out-button" onClick={logoutUser}>
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
            {newName}!
          </h1>

          {/* Afficher le formulaire d'édition si isEditing est vrai */}
          {isEditing ? (
            <div className="edit-name-form">
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                placeholder="Enter new name"
              />
              <button className="save-name-button" onClick={handleSaveName}>
                Save
              </button>
              <button
                className="cancel-name-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        {/* Section comptes */}
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
        {/* Autres sections de comptes */}
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
