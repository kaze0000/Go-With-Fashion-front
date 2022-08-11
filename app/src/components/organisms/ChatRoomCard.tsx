import { AtSignIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { memo } from "react";

export const ChatRoomCard = memo((props: any) => {
  const { userProfile, userImage, chatMessages, setIsChatRoomShow } = props;

  return (
    <>
      <Box onClick={() => setIsChatRoomShow(true)}>
        <Flex>
          <Box bg="white" mx="2%" my="4%" p="1%">
            <Flex align="center" justify="flex-start">
              <Box w="80px" h="80px" mr="6">
                <Image
                  w="80px"
                  h="80px"
                  src={
                    userImage
                      ? userImage.image.url
                      : "http://localhost:3000/fallback/default.png"
                  }
                />
              </Box>
              <Box>
                <Box textAlign="left" maxW="250px">
                  <Text>
                    {userProfile.name} ({userProfile.age}歳)
                  </Text>
                  <Text>{chatMessages[0] ? chatMessages[0].message : ""}</Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
});
