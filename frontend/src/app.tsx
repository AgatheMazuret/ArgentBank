import "./index.css";
import store from "./redux/store";
import Main from "./pages/main";
import SignInPage from "./pages/sign-in";
import UserHomePage from "./pages/user";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
        <SignInPage />
        <UserHomePage />
      </div>
    </Provider>
  );
};

export default App;
