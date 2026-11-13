import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const NavBarComponent = () => {
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    history.push("/");
  };

  const links = [
    { to: "/", label: "Home", exact: true },
    { to: "/allanimals", label: "Gallery" },
    ...(loggedIn
      ? [{ to: "/newanimal", label: "Add animal" }]
      : [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]),
  ];

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <NavLink exact to="/" className="navbar-brand nav-brand">
            Animal Studio
          </NavLink>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              {links.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink
                    exact={link.exact}
                    activeClassName="active"
                    className="nav-link"
                    to={link.to}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {loggedIn && (
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default NavBarComponent;
