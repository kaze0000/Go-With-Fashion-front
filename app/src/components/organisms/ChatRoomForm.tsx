import { Box, Button, FormControl, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

import { useChatMessage } from "../../hooks/chatMessage/useChatMessage";

export const ChatRoomForm = (props: any) => {
  const { chatRoom, chatMessages, setIsSubmit, isSumit } = props;

  const { register, handleSubmit } = useForm();

  const { fetchChatMessage } = useChatMessage();

  const onSubmit = (data: any) => {
    const { message } = data;

    const sendFormData = () => {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/chat_messages`,
          {
            chat_message: {
              chat_room_id: chatRoom.id,
              message: message,
            },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            chatMessages.unshift(res.data);
            fetchChatMessage(chatRoom.id);
            setIsSubmit(!isSumit);
          }, 500);
        })
        .catch((err) => console.log(err));
    };
    sendFormData();

    console.log(chatMessages);
  };

  return (
    <Box mt="4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Textarea
            minH={"60px"}
            {...register("message")}
            placeholder="メッセージを入力してください。"
          />
          <Button
            type="submit"
            display="block"
            ml="auto"
            mt="5"
            backgroundColor={"yellow"}
            _hover={{ opacity: 0.8 }}
          >
            送信
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
