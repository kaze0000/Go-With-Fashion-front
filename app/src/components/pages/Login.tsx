import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useLogin();
  const onSubmit = (data: any) => {
    // console.log(data);
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>メールアドレス</FormLabel>
        <Input {...register("email")} />
        <FormLabel>パスワード</FormLabel>
        <Input {...register("password")} />
      </FormControl>
      <button type="submit">ログイン</button>
    </form>
  );
};

export default Login;
