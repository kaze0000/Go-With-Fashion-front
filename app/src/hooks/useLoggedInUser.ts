import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useLoggedInUser = () => {
  const [user, setUser] = useState({});
  const fetchLoggedInUser = useCallback(() => {
    axios
      .get("http://localhost:3000/api/v1/logged_in", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.logged_in === true) {
          setUser(res.data.user);
        } else if (!res.data.logged_in) {
          setUser({});
        }
      })
      .catch((err) => console.log("ログインエラー", err));
  }, []);
  return { fetchLoggedInUser };
};
