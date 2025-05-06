import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getUserProfile } from "../api/api";
import { getUserAccounts } from "../api/api";
import updateUserProfile from "../pages/user";
import logoutUser from "../pages/user";

type Account = {
  type: "Checking" | "Savings" | "Credit Card";
  balance: number;
};

const accountNumbers: Record<Account["type"], string> = {
  Checking: "x8349",
  Savings: "x6712",
  "Credit Card": "x2493",
};

export const UserHomePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const parseFullName = (fullName: string) => {
    const [first = "", ...rest] = fullName.trim().split(" ");
    return {
      firstName: first,
      lastName: rest.join(" ") || "",
    };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Aucun token trouvé. Redirection vers la page de login.");
        navigate("/login");
        return;
      }

      try {
        const profile = await getUserProfile();
        const { firstName, lastName, email } = profile;

        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setNewName(`${firstName} ${lastName}`);

        const accounts = await getUserAccounts();
        const mappedAccounts = accounts.map(
          (account: { type: string; balance: number }) => ({
            type: account.type as "Checking" | "Savings" | "Credit Card",
            balance: account.balance,
          })
        );
        setAccounts(mappedAccounts);
      } catch (err) {
        console.error("Erreur lors du fetch :", err);
        setError("Erreur lors du chargement des données. Veuillez réessayer.");
      }
    };

    fetchUserData();
  }, [navigate]);

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleSaveName = async () => {
    const { firstName: newFirst, lastName: newLast } = parseFullName(newName);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Aucun token trouvé pour la mise à jour.");
      return;
    }

    try {
      await updateUserProfile();
      setFirstName(newFirst);
      setLastName(newLast);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      setError("Impossible de mettre à jour le nom.");
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
          {error && <p className="error-message">{error}</p>}
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.map((account) => (
          <section className="account" key={account.type}>
            <div className="account-content-wrapper">
              <h3 className="account-title">
                Argent Bank {account.type} ({accountNumbers[account.type]})
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
