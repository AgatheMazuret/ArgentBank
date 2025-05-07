import "../index.css";
import store from "../redux/store";
import Main from "../pages/main";
import SignInPage from "../pages/sign-in";
import UserHomePage from "../pages/user"; // Correction de l'import pour correspondre à une exportation par défaut
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    /* Fournit l'état Redux à tous les composants enfants */
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
