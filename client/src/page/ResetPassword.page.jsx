import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const history = useHistory();
  const [userData, setUserData] = useState({
    password: "",
  });
  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (token) {
        await axios.post("/resetpassword/" + token, userData);
        toast.info("password changed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        history.push("/upload");
      } else {
        toast.info("invalid link", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="form-page">
      <div className="form-card">
        <h2>New password</h2>
        <p className="form-intro">
          Set a strong new password for your account.
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              aria-describedby="emailHelp"
              onChange={handleTextChange}
              value={userData.password}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </section>
  );
};
export default ResetPasswordPage;
