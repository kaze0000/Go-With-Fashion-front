import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { HeaderOnlyLayout } from "../templates/HeaderOnlyLayout";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useLogin();
  const onSubmit = (data: any) => {
    // console.log(data);
    login(data);
  };

  return (
    <HeaderOnlyLayout>
      <Box maxW={"600px"} mx="auto" mt="10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <Input {...register("email")} mb="2" type={"email"} />
            <FormLabel>パスワード</FormLabel>
            <Input {...register("password")} type={"password"} />
          </FormControl>
          <Box textAlign={"right"} my="4">
            <Link to="/sign_up">新規登録はこちら</Link>
          </Box>
          <Button
            type="submit"
            backgroundColor={"yellow"}
            _hover={{ opacity: 0.8 }}
          >
            ログイン
          </Button>
        </form>
      </Box>
    </HeaderOnlyLayout>
  );
};

export default Login;
