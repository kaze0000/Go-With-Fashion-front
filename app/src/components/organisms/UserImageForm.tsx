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
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserImage } from "../../type/api/UserImage";

const UserImageForm = memo((props: any) => {
  const { fetchUserImage, setIsImage } = props;
  const { register, handleSubmit } = useForm<UserImage>();

  const onSubmit = (data: any) => {
    const createFormData = () => {
      const formData = new FormData();
      // if (!image) return;
      formData.append("user_image[image]", data.image[0]);
      return formData;
    };

    const sendFormData = () => {
      const url = "http://localhost:3000/api/v1/user_images";
      const newData = createFormData();
      axios
        .post(url, newData, {
          withCredentials: true,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };
    sendFormData();

    setTimeout(() => {
      fetchUserImage();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>プロフィール画像</FormLabel>
      <FormControl>
        <input type="file" {...register("image")} />
        <Button
          my="4"
          backgroundColor={"yellow"}
          _hover={{ opacity: 0.8 }}
          type="submit"
        >
          更新
        </Button>
      </FormControl>
    </form>
  );
});

export default UserImageForm;
