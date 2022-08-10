import { FaTelegramPlane } from "react-icons/fa";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  Stack,
  Text,
  TagLabel,
  Tag,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useChatMessage } from "../../hooks/chatMessage/useChatMessage";
import { useChatRoom } from "../../hooks/chatRoom/useChatRoom";

import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useLogin } from "../../hooks/useLogin";

import { Brand } from "../../type/api/Brand";
import Subject from "../atoms/Subject";
import { ChatRoomCard } from "../organisms/ChatRoomCard";
import { ChatRoomShow } from "../organisms/ChatRoomShow";
import { PostCard } from "../organisms/PostCard";
import PostForm from "../organisms/PostForm";
import { PostShow } from "../organisms/PostShow";
import { HeaderLayout } from "../templates/HeaderLayout";

export const Messages = () => {
  const { fetchLoggedInUser, user } = useLoggedInUser();

  const [isChatRoomShow, setIsChatRoomShow] = useState(false);
  // const {
  //   fetchPosts,
  //   numberOfElementsArray,
  //   // fetchPosts,
  //   // deletePost,
  //   // fetchPost,
  //   // postAndUserProfileHash,
  //   isLoading,
  // } = useMessage();
  const {
    fetchChatRooms,
    fetchChatRoom,
    numberOfElementsArray,
    chatRoomIndexHash,
    chatRoom,
    isLoading,
  } = useChatRoom();

  const { fetchChatMessage, chatMessage } = useChatMessage();

  // const { user, fetchLoggedInUser } = useLoggedInUser();

  // const onClickPostForm = () => {
  //   setIsPost(!isPost);
  // };

  // const onClickDeletePost = (post_id: any) => {
  //   console.log(post_id);
  //   deletePost(post_id);
  //   setTimeout(() => {
  //     fetchPosts();
  //   }, 100);
  // };

  // useEffect(() => {
  //   fetchChatRooms();
  // }, []);
  // []にisMessageいれないとだめかも

  // useEffect(() => {
  //   fetchLoggedInUser();
  // }, [isPost]);
  console.log(chatMessage);
  useEffect(() => {
    fetchLoggedInUser();
    fetchChatRooms();
  }, []);

  return (
    <HeaderLayout>
      <Flex>
        <Box borderRight="1px solid #EDF2F7" maxW="420px" w="100%">
          <Heading as="h2" my="4" textAlign="center">
            <Box display={"inline-block"} fontSize="2rem">
              <FaTelegramPlane />
            </Box>
            メッセージ
          </Heading>
          <Divider mb="6" />
          <Box overflow={"auto"} h="100vh">
            {isLoading && user ? (
              <Spinner display={"block"} mx="auto" />
            ) : (
              <Box>
                {chatRoomIndexHash &&
                  numberOfElementsArray.map((num: any) => (
                    <Box
                      onClick={() => {
                        fetchChatRoom(chatRoomIndexHash[num]["chat_room"].id);
                        fetchChatMessage(
                          chatRoomIndexHash[num]["chat_room"].id
                        );
                      }}
                    >
                      <ChatRoomCard
                        // postAndUserProfileHash={postAndUserProfileHash}
                        userProfile={chatRoomIndexHash[num]["user_profile"]}
                        // post={postsAndUserProfilesHash[num][0].post}
                        userImage={chatRoomIndexHash[num]["user_image"]}
                        chatRoom={chatRoomIndexHash[num]["chat_room"]}
                        chatMessages={chatRoomIndexHash[num]["chat_messages"]}
                        // onClickDeletePost={onClickDeletePost}
                        isChatRoomShow={isChatRoomShow}
                        setIsChatRoomShow={setIsChatRoomShow}
                        // user={user}
                      />
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
        </Box>
        {isChatRoomShow && chatMessage && (
          <ChatRoomShow
            chatRoom={chatRoom}
            chatMessages={chatMessage.chat_messages}
            myImage={chatMessage.my_image}
            myProfile={chatMessage.my_profile}
            othersImage={chatMessage.others_image}
            othersProfile={chatMessage.others_profile}
          />
        )}
        {/*
        {isPost && <PostForm setIsPost={setIsPost} />}
        {isPostShow && postAndUserProfileHash && (
          <PostShow
            userProfile={postAndUserProfileHash[0][0].user_profile}
            post={postAndUserProfileHash[0][0].post}
            userImage={postAndUserProfileHash[0][0].user_image}
            postedBrands={postAndUserProfileHash[0][0].posted_brands}
            postedArea={postAndUserProfileHash[0][0].posted_area}
            user={user}
            setIsPostShow={setIsPostShow}
          />
        )} */}
      </Flex>
    </HeaderLayout>
  );
};
