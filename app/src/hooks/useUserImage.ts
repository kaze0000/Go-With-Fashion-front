import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { UserImage } from "../type/api/UserImage";
import { UserProfile } from "../type/api/UserProfile";

// apiの実行部分をカスタムフックに閉じる
export const useUserImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userImage, setUserImage] = useState<UserImage | null>(null);

  const fetchUserImage = useCallback(() => {
    axios
      .get("http://localhost:3000/api/v1/user_images/new", {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(true);
        setUserImage(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    fetchUserImage,
    userImage,
    isLoading,
  };
};
