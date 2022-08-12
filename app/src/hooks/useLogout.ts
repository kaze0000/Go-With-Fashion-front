import axios from "axios";
import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { LoginUserContext } from "../providers/LoginUserProvider";
import { User } from "../type/api/User";
import { useMessage } from "./useMessage";

export const useLogout = () => {
  const navigation = useNavigate();
  const { showMessage } = useMessage();

  const logout = useCallback(() => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/logout`,
        // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.logged_out === true) {
          // Todo: ログイン情報はどこで持つ？ provider使う？
          // setLoginUserId(res.data.user.id);

          navigation("/login");
          showMessage({ title: "ログアウトに成功しました", status: "success" });
        } else {
          showMessage({ title: "ログアウトに失敗しました", status: "error" });
        }
      })
      .catch((err) => {
        console.log("logout err", err);
      });
  }, []);
  return { logout };
};
