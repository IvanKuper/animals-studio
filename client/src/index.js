import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
//bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
/* toastify */
import "../node_modules/react-toastify/dist/ReactToastify.css";

/* redux */
import { Provider } from "react-redux";
import store from "./store/index";

/* axios config */
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";
/* 
  axios will add baseUrl before each request that we will send to the server
  if we will provide the full url, then axios will ignore baseUrl
 */

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  /*
      access to storage and try to get the token.
      if the token exist this mean that we login already
        and we need to send the token in the headers.
    */
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});
/* 
  axios.interceptors.request will executed before each request to the server
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
