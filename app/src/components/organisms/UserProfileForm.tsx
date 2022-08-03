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

const UserProfileForm = (props: any) => {
  const { userProfile, setIsEdit } = props;

  const { register, handleSubmit } = useForm<UserProfile>();

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
        {userProfile ? (
          <input
            defaultValue={userProfile.age}
            type="number"
            {...register("age")}
          />
        ) : (
          <input type="number" {...register("age")} />
        )}
      </div>
      <label>自己紹介</label>
      <div>
        {userProfile ? (
          <input
            defaultValue={userProfile.self_introducement}
            type="text"
            {...register("self_introducement")}
          />
        ) : (
          <input
            placeholder="自己紹介文を入力してください。"
            type="text"
            {...register("self_introducement")}
          />
        )}
      </div>
      <label>twitter</label>
      <div>
        {userProfile ? (
          <input
            defaultValue={userProfile.twitter}
            type="text"
            {...register("twitter")}
          />
        ) : (
          <input
            placeholder="TwitterのアカウントURLを入力してください。"
            type="text"
            {...register("twitter")}
          />
        )}
      </div>
      <label>insta</label>
      <div>
        {userProfile ? (
          <input
            defaultValue={userProfile.instagram}
            type="text"
            {...register("instagram")}
          />
        ) : (
          <input
            placeholder="InstagramのアカウントURLを入力してください。"
            type="text"
            {...register("instagram")}
          />
        )}
      </div>
      <label>好きなブランド</label>
      <input {...register("favorite_brands")} />
      <button type="submit">送信</button>
    </form>
  );
};

export default UserProfileForm;
