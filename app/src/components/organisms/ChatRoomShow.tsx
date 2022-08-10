import { AtSignIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Image,
  Input,
  Stack,
  Tag,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";

import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChatMessage } from "../../hooks/chatMessage/useChatMessage";
import { useChatRoom } from "../../hooks/chatRoom/useChatRoom";

import { ChatMessage } from "../../type/api/ChatMessage";
import { ChatRoomForm } from "./ChatRoomForm";

export const ChatRoomShow = (props: any) => {
  const {
    chatRoom,
    chatMessages,
    myImage,
    myProfile,
    othersImage,
    othersProfile,
  } = props;
  console.log(chatMessages);
  console.log(myProfile.user_id);

  // const [isSumit, setIsSubmit] = useState(false);

  return (
    <Box mt="5%" mx="5%" width="100%">
      <Box mx="auto" h="70vh" overflow={"scroll"}>
        {chatMessages.map((chatMessage: ChatMessage) => {
          if (chatMessage.user_id === myProfile.user_id) {
            return (
              <Box>
                <Box my="5">
                  <Flex flexDirection={"row-reverse"}>
                    <Box>
                      <Image
                        w="80px"
                        h="80px"
                        src={
                          myImage
                            ? myImage.image.url
                            : "http://localhost:3000/fallback/default.png"
                        }
                      />
                    </Box>
                    <Box
                      maxW={"250px"}
                      w="100%"
                      backgroundColor={"#aaa"}
                      borderRadius="10px"
                      mr="2%"
                      p="2%"
                    >
                      <Text fontSize="md">{chatMessage.message}</Text>
                      <Text fontSize="xs" mt="10%" textAlign={"right"}>
                        {chatMessage.created_at.substr(0, 16).replace("T", " ")}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            );
          } else {
            return (
              <Box my="5">
                <Flex>
                  <Box>
                    <Image
                      w="80px"
                      h="80px"
                      src={
                        othersImage
                          ? othersImage.image.url
                          : "http://localhost:3000/fallback/default.png"
                      }
                    />
                  </Box>
                  <Box
                    maxW={"250px"}
                    w="100%"
                    backgroundColor={"#aaa"}
                    borderRadius="10px"
                    ml="2%"
                    p="2%"
                  >
                    <Text fontSize="md">{chatMessage.message}</Text>
                    <Text fontSize="xs" mt="10%" textAlign={"right"}>
                      {chatMessage.created_at.substr(0, 16).replace("T", " ")}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            );
          }
        })}
        {/* <Box position={"fixed"} bottom="0" maxW={"390px"} w="100%" left={"50%"}> */}
        {/* </Box> */}
      </Box>
      <ChatRoomForm chatRoom={chatRoom} />
    </Box>
  );
};
