import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../type/api/User";
import { useMessage } from "./useMessage";

export const useLoggedInUser = () => {
  const [user, setUser] = useState<User | null>(null);
  // const { showMessage } = useMessage();
  // const navigation = useNavigate();
  const fetchLoggedInUser = useCallback(() => {
    axios
      .get("http://localhost:3000/api/v1/logged_in", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.logged_in === true) {
          console.log(res.data.user);
          setUser(res.data.user);
        } else if (!res.data.logged_in) {
          // setUser(null);
          // navigation("/login");
          // showMessage({ title: "ログインしてください。", status: "info" });
        }
      })
      .catch((err) => console.log("ログインエラー", err));
  }, []);
  return { fetchLoggedInUser, user };
};
