import axios from "axios";
import { useState, useCallback } from "react";
import { useLogin } from "./useLogin";

import { User } from "../type/api/User";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useRegistration = () => {
  const navigation = useNavigate();
  const { showMessage } = useMessage();
  const registerUser = useCallback((user: User) => {
    axios
      .post(
        "http://localhost:3000/api/v1/signup",
        {
          user: {
            email: user.email,
            password: user.password,
            password_confirmation: user.passwordConfirmation,
          },
        },
        // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める
        { withCredentials: true }
      )
      .then((res) => {
        // 新規登録に成功したらcreatedというステータスが返ってくる
        console.log(res);
        if (res.data.status === "created") {
          navigation("/login");
          showMessage({
            title: "新規登録に成功しました",
            status: "success",
          });
        } else {
          showMessage({
            title: "新規登録に失敗しました",
            status: "error",
          });
        }
      })
      .catch((err) => {
        console.log("resistration err", err);
      });
  }, []);
  return { registerUser };
};
