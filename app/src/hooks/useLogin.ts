import axios from "axios";
import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { LoginUserContext } from "../providers/LoginUserProvider";
import { User } from "../type/api/User";
import { useMessage } from "./useMessage";

export const useLogin = () => {
  const navigation = useNavigate();
  const { showMessage } = useMessage();
  // const { setLoginUserId } = useContext(LoginUserContext);

  const login = useCallback(
    // (email: User, password: User, passwordConfirmation: User) => {
    (user: User) => {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/login`,
          {
            // ユーザオブジェクト
            user: {
              email: user.email,
              password: user.password,
            },
          },
          // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.logged_in === true) {
            // Todo: ログイン情報はどこで持つ？ provider使う？
            // setLoginUserId(res.data.user.id);

            navigation("/mypage");
            showMessage({ title: "ログインに成功しました", status: "success" });
          } else {
            showMessage({ title: "ログインに失敗しました", status: "error" });
          }
        })
        .catch((err) => {
          console.log("resistration err", err);
        });
    },
    []
  );
  return { login };
};
