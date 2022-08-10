import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
      <Link to="/sign_up">新規登録はこちら</Link>
      <Button
        type="submit"
        backgroundColor={"yellow"}
        _hover={{ opacity: 0.8 }}
      >
        ログイン
      </Button>
    </form>
  );
};

export default Login;
