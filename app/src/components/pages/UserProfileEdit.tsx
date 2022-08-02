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
import Subject from "../atoms/Subject";

const UserProfileEdit = (props: any) => {
  const { userProfile, setIsEdit } = props;

  const { register, handleSubmit } = useForm<UserProfile>();

  const onSubmit = (data: UserProfile) => {
    const { name, gender, self_introducement, twitter, instagram } = data;

    const createFormData = () => {
      const formData = new FormData();
      // if (!image) return;
      formData.append("user_profile[name]", name);
      formData.append("user_profile[gender]", gender);
      // formData.append("user_profile[image]", image[0]);
      formData.append("user_profile[self_introducement]", self_introducement);
      formData.append("user_profile[twitter]", twitter);
      formData.append("user_profile[instagram]", instagram);
      return formData;
    };

    const sendFormData = () => {
      const url = "http://localhost:3000/api/v1/user_profiles";
      const newData = createFormData();
      axios
        .patch(url, newData, {
          withCredentials: true,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    sendFormData();

    setIsEdit(false);

    // axios
    //   .patch(
    //     "http://localhost:3000/api/v1/user_profiles",
    //     {
    //       user_profile: {
    //         name: name,
    //         gender: gender,
    //         image: image,
    //         self_introducement: selfIntroducement,
    //         twitter: twitter,
    //         instagram: instagram,
    //       },
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>お名前</label>
      <div>
        {userProfile ? (
          <input
            defaultValue={userProfile.name}
            type="text"
            {...register("name")}
          />
        ) : (
          <input
            placeholder="ユーザー名を入力してください。"
            type="text"
            {...register("name")}
          />
        )}
      </div>
      <select {...register("gender")}>
        <option value="1">man</option>
        <option value="2">women</option>
      </select>
      <label>年齢</label>
      <div>
        <input type="number" {...register("gender")} />
      </div>
      {/* <label>プロフ画像</label>
      <div>
        <input
          // defaultValue={userProfile.image.url}
          type="file"
          {...register("image")}
        />
      </div> */}
      <label>自己紹介</label>
      <div>
        <input type="text" {...register("self_introducement")} />
      </div>
      <label>twitter</label>
      <div>
        <input type="text" {...register("twitter")} />
      </div>
      <label>insta</label>
      <div>
        <input type="text" {...register("instagram")} />
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default UserProfileEdit;
