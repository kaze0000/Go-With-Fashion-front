import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import React, { memo } from "react";
import { useForm } from "react-hook-form";

import { useMessage } from "../../hooks/useMessage";
import { UserImage } from "../../type/api/UserImage";

const UserImageForm = memo((props: any) => {
  const { fetchUserImage, user } = props;
  const { showMessage } = useMessage();

  const { register, handleSubmit } = useForm<UserImage>();

  const onSubmit = (data: any) => {
    if (!user) {
      showMessage({ title: "ログインしてください。", status: "info" });
      return;
    }

    const createFormData = () => {
      const formData = new FormData();
      formData.append("user_image[image]", data.image[0]);
      return formData;
    };

    const sendFormData = () => {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/user_images`;
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
          プロフィール画像を更新
        </Button>
      </FormControl>
    </form>
  );
});

export default UserImageForm;
