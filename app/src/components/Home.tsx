import React from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home(props: {
  loggedInStatus: string;
  handleLogin: Function;
  handleLogout: Function;
}) {
  const { loggedInStatus, handleLogin, handleLogout } = props;
  const navigation = useNavigate();
  const handleSuccessfulAuthentication = (data: any) => {
    handleLogin(data);
    navigation("/dashboard");
  };
  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/api/v1/logout", { withCredentials: true })
      .then(() => handleLogout())
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Home</h1>
      <h2>ログイン状態: {loggedInStatus}</h2>
      <Registration
        handleSuccessfulAuthentication={handleSuccessfulAuthentication}
      />
      {loggedInStatus === "未ログイン" ? (
        <Login
          handleSuccessfulAuthentication={handleSuccessfulAuthentication}
        />
      ) : (
        <button onClick={handleLogoutClick}>ログアウト</button>
      )}
    </div>
  );
}
