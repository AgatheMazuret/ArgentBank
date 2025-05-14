import "./index.css";
import store from "./redux/store";
import Main from "./pages/main";
import SignInPage from "./pages/sign-in";
import { UserHomePage } from "./pages/user";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Ce fichier définit le composant racine de l'application.
// Il configure le store Redux pour la gestion de l'état global.
// Le routeur est utilisé pour gérer la navigation entre les différentes pages de l'application.

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/user" element={<UserHomePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
