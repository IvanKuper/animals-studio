import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ForgetPasswordPage = () => {
  const [userData, setUserData] = useState({
    email: "",
  });
  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/forgetpassword", userData);
    } catch (err) {
      console.log(err);
    }
    toast.info("Please check your email, to reset your password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <section className="form-page">
      <div className="form-card">
        <h2>Reset password</h2>
        <p className="form-intro">
          Enter your email to receive a secure reset link.
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleTextChange}
              value={userData.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPasswordPage;
