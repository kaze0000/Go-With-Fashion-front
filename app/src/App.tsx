import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./router/Router";

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  const handleLogin = (data: any) => {
    setLoggedInStatus("ログインなう");
    setUser(data.user);
  };

  // 第2引数なし=>Render毎に第１引数の関数を実行。
  useEffect(() => {
    checkLoggedInStatus();
  });

  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setUser({});
  };

  const checkLoggedInStatus = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/logged_in`, {
        withCredentials: true,
      })
      .then((res) => {
        // Fix: 再読み込みする際に文字が一瞬見えてしまう
        if (res.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインなう");
          setUser(res.data.user);
          console.log(user);
          console.log(loggedInStatus);
        } else if (!res.data.logged_in && loggedInStatus === "ログイン") {
          setLoggedInStatus("未ログイン");
          setUser({});
        }
      })
      .catch((err) => console.log("ログインエラー", err));
  };
  return (
    <>
      {/* <PostForm posts={posts} setPosts={setPosts} /> */}
      {/* <PostList posts={posts} setPosts={setPosts} /> */}
      <ChakraProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
