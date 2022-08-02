import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  gender: number;
  selfIntroducement: string;
  twitter: string;
  insta: string;
};

export const UserProfileForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    const { name, gender, selfIntroducement, twitter, insta } = data;
    axios
      .post(
        "http://localhost:3000/api/v1/user_profiles",
        {
          user_profile: {
            name: name,
            gender: gender,
            self_introducement: selfIntroducement,
            twitter: twitter,
            instagram: insta,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>お名前</label>
      <div>
        <input type="text" {...register("name")} />
      </div>
      <select {...register("gender")}>
        <option value="1">man</option>
        <option value="2">women</option>
      </select>
      <label>自己紹介</label>
      <div>
        <input type="text" {...register("selfIntroducement")} />
      </div>
      <label>twitter</label>
      <div>
        <input type="text" {...register("twitter")} />
      </div>
      <label>insta</label>
      <div>
        <input type="text" {...register("insta")} />
      </div>
      <button type="submit">送信</button>
    </form>
  );
};
