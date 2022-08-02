import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { UserProfile } from "../../type/api/UserProfile";

const UserImageForm = (props: any) => {
  const { register, handleSubmit } = useForm<UserProfile>();

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

    // setIsEdit(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>プロフ画像</label>
      <div>
        <input type="file" {...register("image")} />
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default UserImageForm;
