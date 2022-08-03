import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "../type/api/UserProfile";

// apiの実行部分をカスタムフックに閉じる
export const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  const fetchAllUserProfiles = useCallback(() => {
    axios
      .get("http://localhost:3000/api/v1/user_profiles")
      .then((res) => {
        console.log(res);
        setUserProfiles(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchUserProfile = useCallback(() => {
    axios
      .get("http://localhost:3000/api/v1/user_profiles/new", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserProfile(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return {
    fetchAllUserProfiles,
    fetchUserProfile,
    loading,
    userProfiles,
    userProfile,
  };
};
