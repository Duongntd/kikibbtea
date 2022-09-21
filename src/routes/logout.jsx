import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../components/Header";

export default function Logout() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(loginState);
  localStorage.setItem("user", "");
  localStorage.setItem("userIdList", "");
  localStorage.setItem("loggedIn", "");
  setTimeout(() => {
    navigate("/");
    setIsLoggedIn(false);
  }, 1500);
  return (
    <main>
      <h3>Logout successful! Redirecting...</h3>
    </main>
  );
}
