// Point d'entrée principal de l'application React.
// Ce fichier monte le composant racine (App) dans le DOM en utilisant ReactDOM.
// Le mode strict de React est activé pour détecter les problèmes potentiels dans l'application.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
