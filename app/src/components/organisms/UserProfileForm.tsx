import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputLeftAddon,
  List,
  ListIcon,
  ListItem,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { UserProfile } from "../../type/api/UserProfile";
import Subject from "../atoms/Subject";

const UserProfileForm = (props: any) => {
  const { userProfile, setIsEdit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>();

  const onSubmit = (data: UserProfile) => {
    const {
      name,
      gender,
      age,
      self_introducement,
      twitter,
      instagram,
      favorite_brands,
    } = data;
    const sendFormData = () => {
      axios
        .post(
          "http://localhost:3000/api/v1/user_profiles",
          {
            user_profile: {
              name: name,
              gender: gender,
              age: age,
              self_introducement: self_introducement,
              twitter: twitter,
              instagram: instagram,
            },
            favorite_brands: { names: favorite_brands },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    sendFormData();

    setTimeout(() => {
      setIsEdit(false);
    }, 500);
  };

  return (
    <Box mx="auto" mt="5%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Box>
            <FormLabel>名前</FormLabel>
            {userProfile ? (
              <Input
                defaultValue={userProfile.name}
                type="text"
                {...register("name")}
                mb="4"
              />
            ) : (
              <Input
                placeholder="ユーザー名を入力してください。"
                type="text"
                {...register("name")}
                mb="4"
              />
            )}
          </Box>

          <Box>
            <FormLabel>性別</FormLabel>
            <Select
              {...register("gender")}
              defaultValue={userProfile ? userProfile.gender : 0}
              mb="4"
            >
              <option value="0">未選択</option>
              <option value="1">男性</option>
              <option value="2">女性</option>
            </Select>
          </Box>

          <Box>
            <FormLabel>年齢</FormLabel>
            {userProfile ? (
              <Input
                defaultValue={userProfile.age}
                type="number"
                {...register("age")}
                mb="4"
              />
            ) : (
              <Input type="number" {...register("age")} mb="4" />
            )}
          </Box>

          <Box>
            <FormLabel>自己紹介</FormLabel>
            {userProfile ? (
              <Textarea
                defaultValue={userProfile.self_introducement}
                {...register("self_introducement")}
                mb="4"
              />
            ) : (
              <Textarea
                placeholder="自己紹介文を入力してください。"
                {...register("self_introducement")}
                mb="4"
              />
            )}
          </Box>

          <Box>
            <FormLabel>twitter URL</FormLabel>
            {userProfile ? (
              <Input
                defaultValue={userProfile.twitter}
                type="text"
                {...register("twitter", {
                  pattern: /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/,
                })}
              />
            ) : (
              <Input
                placeholder="TwitterのアカウントURLを入力してください。"
                type="text"
                {...register("twitter", {
                  pattern: /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/,
                })}
              />
            )}
          </Box>

          {errors.twitter && errors.twitter.type === "pattern" && (
            <span style={{ color: "red", fontSize: ".8rem" }}>
              URLの形で入力してください。
            </span>
          )}

          <Box>
            <FormLabel mt="4">Instagram URL</FormLabel>
            {userProfile ? (
              <Input
                defaultValue={userProfile.instagram}
                type="text"
                {...register("instagram", {
                  pattern: /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/,
                })}
              />
            ) : (
              <Input
                placeholder="InstagramのアカウントURLを入力してください。"
                type="text"
                {...register("instagram", {
                  pattern: /https?:\/\/[\w!\?/\+\-_~=;\.,\*&@#\$%\(\)'\[\]]+/,
                })}
              />
            )}
          </Box>

          {errors.instagram && errors.instagram.type === "pattern" && (
            <span style={{ color: "red", fontSize: ".8rem" }}>
              URLの形で入力してください。
            </span>
          )}

          <Box>
            <FormLabel mt="4">
              好きなブランド
              <br />
              <Text fontSize={"xs"} fontWeight="bold">
                ブランド名を半角スペースを開けて入力してください。
              </Text>
            </FormLabel>
            <Input {...register("favorite_brands")} mb="4" />
          </Box>
          <Button
            type="submit"
            backgroundColor={"yellow"}
            _hover={{ opacity: 0.8 }}
          >
            更新
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default UserProfileForm;
