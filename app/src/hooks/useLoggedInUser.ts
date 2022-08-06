import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { User } from "../type/api/User";

export const useLoggedInUser = () => {
  const [user, setUser] = useState<User | null>(null);
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
        }
      })
      .catch((err) => console.log("ログインエラー", err));
  }, []);
  return { fetchLoggedInUser, user };
};
