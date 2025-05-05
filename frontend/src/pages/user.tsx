import "../index.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { logoutUser } from "../redux/auth-actions";

export const UserHomePage = () => {
  // Initialisation de l'état pour savoir si l'utilisateur est en train de modifier son nom
  const [isEditing, setIsEditing] = useState(false);
  // Initialisation de l'état pour le nouveau nom à sauvegarder
  const [newName, setNewName] = useState("");

  // Initialisation de l'état pour stocker les informations de l'utilisateur
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Initialisation de l'état pour contrôler l'affichage du menu déroulant
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Référence pour gérer l'événement de clic extérieur au dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fonction pour découper un nom complet en prénom et nom
  const parseFullName = (fullName: string) => {
    const [first = "", ...rest] = fullName.trim().split(" ");
    return {
      firstName: first,
      lastName: rest.join(" ") || "",
    };
  };

  // Effet qui récupère le profil utilisateur au chargement de la page
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

        // Traitement de la réponse et mise à jour de l'état avec les informations récupérées
        const data = await response.json();
        const { firstName, lastName, email } = data.body;

        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setNewName(`${firstName} ${lastName}`);
      } catch (error) {
        console.error("Erreur lors du fetch du profil utilisateur:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Gestion du changement de valeur du champ de nom
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleSaveName = async () => {
    // On découpe le nom complet en prénom et nom
    const { firstName: newFirst, lastName: newLast } = parseFullName(newName);

    try {
      // Envoi de la mise à jour du profil utilisateur vers l'API
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

      // Mise à jour des informations utilisateur après une modification réussie
      setFirstName(newFirst);
      setLastName(newLast);
      setIsEditing(false);
      console.log("Nom mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  // Effet pour fermer le menu déroulant si l'utilisateur clique en dehors de celui-ci
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
