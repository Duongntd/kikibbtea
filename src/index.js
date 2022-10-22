import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import Home from "./routes/home";
import Order from "./routes/order";
import Signup from "./routes/signup";
import User from "./routes/user";
import Logout from "./routes/logout";
import Account from "./routes/account/account";
import Profile from "./routes/account/profile";
import Overview from "./routes/account/overview";
import Rewards from "./routes/account/rewards";
import Settings from "./routes/account/settings";
import History from "./routes/account/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<Signup />} />
          <Route path="order" element={<Order />} />
          <Route path="user" element={<User />} />
          <Route path="account" element={<Account />}>
            <Route path="/account" element={<Overview />} />
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/rewards" element={<Rewards />} />
            <Route path="/account/settings" element={<Settings />} />
            <Route path="/account/history" element={<History />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
