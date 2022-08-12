import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Post } from "../../type/api/Post";

// apiの実行部分をカスタムフックに閉じる
export const usePost = () => {
  const [isLoading, setIsLoading] = useState(true);

  // #indexで対応するpostやuserProfileを全てとってくる
  const [postsAndUserProfilesHash, setPostsAndUserProfilesHash] =
    useState<any>(null);

  // #showで対応するpostやuserProfileを一つとってくる
  const [postAndUserProfileHash, setPostAndUserProfileHash] =
    useState<any>(null);

  const [user_profiles, setUserProfiles] = useState<any>(null);

  const [numberOfElementsArray, setNumberOfElementsArray] = useState<any>([]);

  const fetchPosts = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setPostsAndUserProfilesHash(res.data);

        // 力技でpostとpostに関連したuserProfileを表示できるようにした
        const numberOfElements = Object.keys(res.data).length;
        setNumberOfElementsArray([...Array(numberOfElements)].map((_, i) => i));

        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = useCallback((post_id: number) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${post_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchPost = useCallback((post_id: any) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts/${post_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setPostAndUserProfileHash(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    fetchPosts,
    deletePost,
    postsAndUserProfilesHash,
    numberOfElementsArray,
    fetchPost,
    postAndUserProfileHash,
    isLoading,
  };
};
