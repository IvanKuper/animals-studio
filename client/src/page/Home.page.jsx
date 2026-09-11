import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="hero-section">
      <div className="hero-panel">
        <span className="eyebrow">Premium Animal Management</span>
        <h1 className="hero-title">Modern. Fast. Secure.</h1>
        <p className="hero-copy">
          A sleek interface for tracking animals, uploading media, and managing
          your data with confidence. Designed for responsive performance and
          accessible interactions across every device.
        </p>
        <div className="hero-actions">
          <NavLink to="/allanimals" className="btn btn-primary btn-hero">
            Browse Animals
          </NavLink>
          <NavLink to="/upload" className="btn btn-secondary btn-hero-outline">
            Upload Animal
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
