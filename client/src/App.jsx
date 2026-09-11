import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./page/Home.page";
import LoginPage from "./page/Login.page";
import RegisterPage from "./page/Register.page";
import NotFoundPage from "./page/NotFound.page";
import UploadPage from "./page/Upload.page";
import NavBarComponent from "./components/Navbar.component";
import AuthGuardRoute from "./guard/AuthGuardRoute";
import NewAnimalPage from "./page/NewAnimal.page";
import AllAnimalsPage from "./page/AllAnimals.page";
import ForgetPasswordPage from "./page/ForgetPassword.page";
import { ToastContainer } from "react-toastify";
import ResetPasswordPage from "./page/ResetPassword.page";

function App() {
  return (
    <div className="app-shell">
      <NavBarComponent />
      <main className="page-content">
        <ToastContainer position="top-right" />
        <Switch>
          <Route path="/newanimal" component={NewAnimalPage} />
          <Route path="/allanimals" component={AllAnimalsPage} />
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/login" component={LoginPage} />
          <Route path="/forgetpassword" component={ForgetPasswordPage} />
          <Route path="/resetpassword/:token" component={ResetPasswordPage} />
          <Route path="/register" component={RegisterPage} />
          <AuthGuardRoute path="/upload" component={UploadPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
