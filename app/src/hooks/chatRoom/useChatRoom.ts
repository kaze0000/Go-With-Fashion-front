import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoom } from "../../type/api/ChatRoon";

// apiの実行部分をカスタムフックに閉じる
export const useChatRoom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);

  // #indexで対応するpostやuserProfileを全てとってくる
  const [chatRoomIndexHash, setChatRoomIndexHash] = useState<any>(null);

  // #showで対応するpostやuserProfileを一つとってくる
  // const [postAndUserProfileHash, setPostAndUserProfileHash] =
  //   useState<any>(null);

  // const [user_profiles, setUserProfiles] = useState<any>(null);

  const [numberOfElementsArray, setNumberOfElementsArray] = useState<any>([]);

  const fetchChatRooms = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/chat_rooms`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setChatRoomIndexHash(res.data);

        // 力技でpostとpostに関連したuserProfileを表示できるようにした
        // const numberOfElements = Object.keys(res.data).length;
        setNumberOfElementsArray(
          [...Array(Object.keys(res.data).length)].map((_, i) => i)
        );

        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchChatRoom = useCallback((chat_room_id: number) => {
    console.log(chat_room_id);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/chat_rooms/${chat_room_id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setChatRoom(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const createChatRoom = useCallback((user_id: number) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/chat_rooms`,
        {
          user_id: user_id,
        },
        // axiosでバックエンドのAPI(Rails)と通信する際にデータにcookieを含めるかどうかを決める
        { withCredentials: true }
      )
      .then((res) => {
        // 新規登録に成功したらcreatedというステータスが返ってくる
        console.log(res);
        // messageに遷移させて、fetchでchatroomのshowを行う

        // navigation(`/messages/${res.data.id}`);
        // fetchChatRoom(res.data.id);
        // console.log(res.data);

        // if (res.data.status === "created") {
        //   navigation("/login");
        //   showMessage({
        //     title: "新規登録に成功しました",
        //     status: "success",
        //   });
        // } else {
        //   showMessage({
        //     title: "新規登録に失敗しました",
        //     status: "error",
        //   });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const deletePost = useCallback((post_id: number) => {
  //   axios
  //     .delete(`http://localhost:3000/api/v1/posts/${post_id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       // setPosts(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // const fetchPost = useCallback((post_id: any) => {
  //   axios
  //     .get(`http://localhost:3000/api/v1/posts/${post_id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setPostAndUserProfileHash(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return {
    fetchChatRooms,
    createChatRoom,
    fetchChatRoom,
    chatRoom,
    // deletePost,
    chatRoomIndexHash,
    numberOfElementsArray,
    // fetchPost,
    // postAndUserProfileHash,
    isLoading,
  };
};
