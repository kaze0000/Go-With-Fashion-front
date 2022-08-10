import React, { useEffect } from "react";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { ChatRoomShow } from "../components/organisms/ChatRoomShow";

import Login from "../components/pages/Login";
import { Messages } from "../components/pages/Messages";
import Mypage from "../components/pages/Mypage";
import Posts from "../components/pages/Posts";
import { SignUp } from "../components/pages/SignUp";
import { useLoggedInUser } from "../hooks/useLoggedInUser";
import { useMessage } from "../hooks/useMessage";
// import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router = memo(() => {
  const { user, fetchLoggedInUser } = useLoggedInUser();
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    // <LoginUserProvider>
    <Routes>
      <Route path="/" element={<Mypage />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/messages" element={<Messages />}>
        <Route path=":id" element={<ChatRoomShow />} />
      </Route>
    </Routes>
    // </LoginUserProvider>
  );
});
