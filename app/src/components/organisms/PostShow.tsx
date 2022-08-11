import { AtSignIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  List,
  ListItem,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Brand } from "../../type/api/Brand";

import { useChatRoom } from "../../hooks/chatRoom/useChatRoom";
import { useMessage } from "../../hooks/useMessage";

import { UserProfileList } from "../atoms/posts/UserProfileList";

import { CommonModal } from "../molecules/CommonModal";

const genderList = ["未入力", "男性", "女性"];

export const PostShow = memo((props: any) => {
  const {
    post,
    userProfile,
    userImage,
    postedBrands,
    postedArea,
    user,
    setIsPostShow,
  } = props;

  const { showMessage } = useMessage();

  const { createChatRoom } = useChatRoom();

  const navigation = useNavigate();

  return (
    <Box mx="auto" pos="relative" mt="5%">
      <CloseIcon
        pos="absolute"
        right="-10"
        top="2"
        onClick={() => setIsPostShow(false)}
      />
      <Box maxW="300px" mx="auto">
        <Image
          w="100%"
          h="auto"
          src={
            userImage
              ? userImage.image.url
              : "http://localhost:3000/fallback/default.png"
          }
        />
      </Box>
      <Stack spacing="2" my="2" maxW="300px">
        <Box>
          <Text as="span">{post.preferred_at}</Text>
          <Text as="span" pl="2">
            <AtSignIcon w="3" />
            {postedArea.name}
          </Text>
        </Box>
        <Text>{userProfile.name}</Text>
        <Flex maxW="350px" flexWrap="wrap">
          {postedBrands.map((postedBrand: Brand) => (
            <Tag
              size="sm"
              key={postedBrand.id}
              borderRadius="full"
              variant="solid"
              colorScheme="gray"
              mr="2"
              mb="2"
            >
              <TagLabel>{postedBrand.name}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <Text>{post.body}</Text>
      </Stack>
      {(!user || user.id != post.user_id) && (
        <Flex justifyContent="space-between">
          <CommonModal buttonName="プロフィール">
            <Box maxW="300px" mx="auto">
              <Image
                src={
                  userImage
                    ? userImage.image.url
                    : "http://localhost:3000/fallback/default.png"
                }
              />
            </Box>
            <Text fontWeight="bold" my="4">
              自己紹介
            </Text>
            <Text>{userProfile.self_introducement}</Text>
            <Divider my="4" />
            <List>
              <ListItem>
                <UserProfileList
                  listTitle="名前"
                  listContent={userProfile.name}
                />
              </ListItem>
              <ListItem>
                <UserProfileList
                  listTitle="性別"
                  listContent={genderList[userProfile.gender]}
                />
              </ListItem>
              <ListItem>
                <UserProfileList
                  listTitle="年齢"
                  listContent={userProfile.age}
                />
              </ListItem>
            </List>
          </CommonModal>
          <Button
            onClick={() => {
              if (!user) {
                showMessage({
                  title: "ログインしてください。",
                  status: "info",
                });
                return;
              }
              createChatRoom(post.user_id);
              navigation("/messages");
            }}
          >
            メッセージを送る
          </Button>
        </Flex>
      )}
    </Box>
  );
});
