import { AtSignIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  createIcon,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { memo } from "react";
import Modal from "react-modal";
import { useChatRoom } from "../../hooks/chatRoom/useChatRoom";

import { usePost } from "../../hooks/post/usePost";
import { Brand } from "../../type/api/Brand";
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
    isPostShow,
    setIsPostShow,
  } = props;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { fetchPost } = usePost();

  const { createChatRoom } = useChatRoom();

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
              colorScheme="orange"
              mr="2"
              mb="2"
            >
              <TagLabel>{postedBrand.name}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <Text>{post.body}</Text>
      </Stack>
      {user.id != post.user_id && (
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
          <Button onClick={() => createChatRoom(post.user_id)}>
            メッセージを送る
          </Button>
        </Flex>
      )}
    </Box>
  );
});
