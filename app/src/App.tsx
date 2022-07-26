import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { Post } from "./interfaces/index";
import { getPosts } from "./lib/api/posts";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const handleGetPost = async () => {
    try {
      const res = await getPosts();

      if (res.status === 200) {
        setPosts(res.data.posts);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetPost();
  }, []);

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
      .get("http://localhost:3000/api/v1/logged_in", {
        withCredentials: true,
      })
      .then((res) => {
        // Fix: 再読み込みする際に文字が一瞬見えてしまう
        if (res.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインなう");
          setUser(res.data.user);
        } else if (!res.data.logged_in && loggedInStatus === "ログイン") {
          setLoggedInStatus("未ログイン");
          setUser({});
        }
      })
      .catch((err) => console.log("ログインエラー", err));
  };
  return (
    <>
      <PostForm posts={posts} setPosts={setPosts} />
      {/* <PostList posts={posts} setPosts={setPosts} /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <Home
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            }
          />
          <Route
            path={"/dashboard"}
            element={<Dashboard loggedInStatus={loggedInStatus} />}
          />
          {/* <Route
            path={"/dashboard"}
            render={(props) => (
              <Home {...props} loggedInStatus={loggedInStatus} />
            )}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
