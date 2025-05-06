import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/auth-actions";
import { AppDispatch } from "../redux/store";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const errorMessage = useSelector(
    (state: RootState) => state.auth.errorMessage
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      console.log("Dispatching login action...");
      const resultAction = (await dispatch(
        login(email, password, rememberMe)
      )) as unknown as { payload: { token: string } };
      const token = resultAction?.payload?.token;

      if (token) {
        if (rememberMe) {
          localStorage.setItem("token", token);
          console.log("Token stocké dans localStorage:", token);
        } else {
          sessionStorage.setItem("token", token);
          console.log("Token stocké dans sessionStorage:", token);
        }

        console.log("Token trouvé :", token);
        navigate("/user");
      } else {
        console.log("Aucun token trouvé.");
      }

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
