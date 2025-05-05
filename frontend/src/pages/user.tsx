import "../index.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { logoutUser } from "../redux/auth-actions";

export const UserHomePage = () => {
  const [isEditing, setIsEditing] = useState(false); // Contrôle si le formulaire d'édition est visible
  const [newName, setNewName] = useState(""); // Garde la valeur temporaire du nom complet
  const [firstName, setFirstName] = useState(""); // Prénom actuel
  const [lastName, setLastName] = useState(""); // Nom actuel
  const [email, setEmail] = useState(""); // Email de l'utilisateur
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Contrôle si le menu déroulant est ouvert
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Référence pour le menu déroulant

  // Pour stocker les informations des comptes
  const [accounts, setAccounts] = useState([
    { type: "Checking", balance: 0 },
    { type: "Savings", balance: 0 },
    { type: "Credit Card", balance: 0 },
  ]);

  // Fonction pour découper le nom complet en prénom et nom
  const parseFullName = (fullName: string) => {
    const [first = "", ...rest] = fullName.trim().split(" ");
    return {
      firstName: first,
      lastName: rest.join(" ") || "",
    };
  };

  // Récupère le profil utilisateur à l'initialisation
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil");
        }

        const data = await response.json();
        const { firstName, lastName, email } = data.body;

        setFirstName(firstName); // Met à jour le prénom
        setLastName(lastName); // Met à jour le nom
        setEmail(email); // Met à jour l'email
        setNewName(`${firstName} ${lastName}`); // Met à jour le nom complet

        // Récupérer les informations des comptes
        const accountsData = await fetch(
          "http://localhost:3001/api/v1/user/accounts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!accountsData.ok) {
          throw new Error("Erreur lors de la récupération des comptes");
        }

        const accountsJson = await accountsData.json();
        setAccounts(accountsJson.body.accounts); // Met à jour les informations des comptes
      } catch (error) {
        console.error("Erreur lors du fetch du profil utilisateur:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value); // Met à jour le nom complet dans l'état
  };

  const handleSaveName = async () => {
    const { firstName: newFirst, lastName: newLast } = parseFullName(newName);

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            firstName: newFirst,
            lastName: newLast,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      setFirstName(newFirst); // Met à jour l'état avec le nouveau prénom
      setLastName(newLast); // Met à jour l'état avec le nouveau nom
      setIsEditing(false); // Ferme le formulaire d'édition
      console.log("Nom mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
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
            {firstName} {lastName}!
          </h1>

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

        {/* Affichage des informations des comptes */}
        {accounts.map((account) => (
          <section className="account" key={account.type}>
            <div className="account-content-wrapper">
              <h3 className="account-title">
                Argent Bank {account.type} (
                {account.type === "Checking"
                  ? "x8349"
                  : account.type === "Savings"
                  ? "x6712"
                  : "x2493"}
                )
              </h3>
              <p className="account-amount">${account.balance.toFixed(2)}</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserHomePage;
