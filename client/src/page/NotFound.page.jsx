import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="notfound-page">
      <div className="notfound-panel">
        <h1>404</h1>
        <p>The page you are looking for does not exist.</p>
        <NavLink to="/" className="btn btn-secondary">
          Return Home
        </NavLink>
      </div>
    </section>
  );
};

export default NotFoundPage;
