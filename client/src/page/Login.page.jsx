import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", userData);
      //   console.log("data", data);
      localStorage.setItem("token", data.token);
      dispatch(authActions.login());
      history.push("/newanimal");
    } catch (err) {
      toast.error(String(err.response?.data?.error || "Login failed, please try again"));
    }
  };
  return (
    <section className="form-page">
      <div className="form-card">
        <h2>Login</h2>
        <p className="form-intro">Secure access to your animal dashboard.</p>
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
              ref={emailRef}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
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

export default LoginPage;
