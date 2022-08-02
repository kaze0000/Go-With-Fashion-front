import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRegistration } from "../../hooks/useRegistration";

const Home = () => {
  const { register, handleSubmit } = useForm();
  const { registerUser } = useRegistration();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <p>新規登録</p>
      <form onSubmit={() => handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="メールアドレス"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="パスワード"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="確認用パスワード"
          {...register("passwordConfirmation")}
        />

        <button type="submit">登録</button>
      </form>
    </>
  );
};

export default Home;
