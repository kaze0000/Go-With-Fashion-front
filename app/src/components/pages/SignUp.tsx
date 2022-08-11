import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRegistration } from "../../hooks/useRegistration";
import { HeaderOnlyLayout } from "../templates/HeaderOnlyLayout";
import { Link } from "react-router-dom";

export const SignUp = memo(() => {
  const { register, handleSubmit } = useForm();
  const { registerUser } = useRegistration();
  const onSubmit = (data: any) => {
    registerUser(data);
  };

  return (
    <HeaderOnlyLayout>
      <Box maxW={"600px"} mx="auto" mt="10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>メールアドレス</FormLabel>
            <Input {...register("email")} mb="2" type={"email"} />
            <FormLabel>パスワード</FormLabel>
            <Input {...register("password")} mb="2" type={"password"} />
            <FormLabel>パスワード確認</FormLabel>
            <Input
              {...register("passwordConfirmation")}
              mb="2"
              type={"password"}
            />
          </FormControl>
          <Box textAlign={"right"} my="4">
            <Link to="/login">ログインはこちら</Link>
          </Box>
          <Button
            type="submit"
            backgroundColor={"yellow"}
            _hover={{ opacity: 0.8 }}
          >
            登録
          </Button>
        </form>
      </Box>
    </HeaderOnlyLayout>
  );
});
