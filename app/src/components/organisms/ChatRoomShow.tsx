import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";

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

  const [isSumit, setIsSubmit] = useState(false);

  return (
    <Box mt="5%" mx="5%" width="100%">
      <Box mx="auto" h="60vh" overflow={"scroll"}>
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
                            : `${process.env.REACT_APP_SERVER_URL}/fallback/default.png`
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
                          : `${process.env.REACT_APP_SERVER_URL}/fallback/default.png`
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
      </Box>
      <ChatRoomForm
        chatRoom={chatRoom}
        chatMessages={chatMessages}
        isSumit={isSumit}
        setIsSubmit={setIsSubmit}
      />
    </Box>
  );
};
