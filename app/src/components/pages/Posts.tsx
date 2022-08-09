import { AtSignIcon, Search2Icon } from "@chakra-ui/icons";
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
import { usePost } from "../../hooks/post/usePost";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useLogin } from "../../hooks/useLogin";
import { Brand } from "../../type/api/Brand";
import Subject from "../atoms/Subject";
import { PostCard } from "../organisms/PostCard";
import PostForm from "../organisms/PostForm";
import { PostShow } from "../organisms/PostShow";
import { HeaderLayout } from "../templates/HeaderLayout";

const Posts = () => {
  const [isPost, setIsPost] = useState(false);
  const [isPostShow, setIsPostShow] = useState(false);
  const {
    postsAndUserProfilesHash,
    numberOfElementsArray,
    fetchPosts,
    deletePost,
    fetchPost,
    postAndUserProfileHash,
    isLoading,
  } = usePost();
  const { user, fetchLoggedInUser } = useLoggedInUser();

  const onClickPostForm = () => {
    setIsPost(!isPost);
  };

  const onClickDeletePost = (post_id: any) => {
    console.log(post_id);
    deletePost(post_id);
    setTimeout(() => {
      fetchPosts();
    }, 100);
  };

  useEffect(() => {
    fetchPosts();
  }, [isPost]);

  useEffect(() => {
    fetchLoggedInUser();
  }, [isPost]);

  return (
    <HeaderLayout>
      <Flex>
        <Box
          borderRight="1px solid #EDF2F7"
          px="2%"
          maxW="420px"
          w="100%"
          textAlign={"center"}
        >
          <Heading as="h2" my="4" textAlign="center">
            <Search2Icon w="7" mr="4" />
            掲示板
          </Heading>
          <Divider mb="6" />
          <Box overflow={"auto"} h="100vh">
            {isLoading ? (
              <Spinner display={"block"} mx="auto" />
            ) : (
              <Box>
                {postsAndUserProfilesHash &&
                  numberOfElementsArray.map((num: any) => (
                    <Box
                      onClick={() =>
                        fetchPost(postsAndUserProfilesHash[num][0].post.id)
                      }
                    >
                      <PostCard
                        postAndUserProfileHash={postAndUserProfileHash}
                        userProfile={
                          postsAndUserProfilesHash[num][0].user_profile
                        }
                        post={postsAndUserProfilesHash[num][0].post}
                        userImage={postsAndUserProfilesHash[num][0].user_image}
                        postedBrands={
                          postsAndUserProfilesHash[num][0].posted_brands
                        }
                        postedArea={
                          postsAndUserProfilesHash[num][0].posted_area
                        }
                        onClickDeletePost={onClickDeletePost}
                        isPostShow={isPostShow}
                        setIsPostShow={setIsPostShow}
                        user={user}
                      />
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
          <Button
            onClick={onClickPostForm}
            position="fixed"
            transform="translate(-50%, -50%)"
            bottom="5%"
            backgroundColor={"yellow"}
            _hover={{ opacity: 0.8 }}
          >
            投稿する
          </Button>
        </Box>
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
        )}
      </Flex>
    </HeaderLayout>
  );
};

export default Posts;
