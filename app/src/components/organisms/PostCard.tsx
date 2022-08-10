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
import { usePost } from "../../hooks/post/usePost";
import { Brand } from "../../type/api/Brand";
import { PostShow } from "./PostShow";

export const PostCard = memo((props: any) => {
  const {
    post,
    userProfile,
    userImage,
    postedBrands,
    postedArea,
    user,
    onClickDeletePost,
    isPostShow,
    setIsPostShow,
  } = props;

  return (
    <>
      <Box onClick={() => setIsPostShow(true)}>
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
                  <Text as="span">{post.preferred_at}</Text>
                  <Text as="span" pl="2">
                    <AtSignIcon w="3" />
                    {postedArea.name}
                  </Text>
                  {user && user.id == post.user_id && (
                    <DeleteIcon
                      w="5"
                      h="6"
                      ml="6"
                      mb="1"
                      onClick={() => onClickDeletePost(post.id)}
                    >
                      削除
                    </DeleteIcon>
                  )}
                  <Text>{userProfile.name}</Text>
                  <Box my="2">
                    {postedBrands.map((postedBrand: Brand) => (
                      <Tag
                        size="sm"
                        key={postedBrand.id}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="gray"
                        mr="2"
                      >
                        <TagLabel>{postedBrand.name}</TagLabel>
                      </Tag>
                    ))}
                  </Box>
                  <Text>
                    {post.body
                      ? post.body.substr(0, 10) + "..."
                      : "詳細が入ります。"}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
});
