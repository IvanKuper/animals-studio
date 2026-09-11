import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthGuardRoute = ({ component: Component, ...otherProps }) => {
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  return (
    <Route
      {...otherProps}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AuthGuardRoute;
