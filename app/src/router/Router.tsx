import React from "react";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../components/pages/Login";
import Mypage from "../components/pages/Mypage";
import { SignUp } from "../components/pages/SignUp";
// import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router = memo(() => {
  return (
    // <LoginUserProvider>
    <Routes>
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
    // </LoginUserProvider>
  );
});
