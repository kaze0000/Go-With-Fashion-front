import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";

import {
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

export const SignUp = memo(() => {
  const { register, handleSubmit } = useForm();
  const { registerUser } = useRegistration();
  const onSubmit = (data: any) => {
    registerUser(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input {...register("email")} />
          <FormLabel>パスワード</FormLabel>
          <Input {...register("password")} />
          <FormLabel>パスワード確認</FormLabel>
          <Input {...register("passwordConfirmation")} />
        </FormControl>
        <button type="submit">登録</button>
      </form>
    </>
  );
});
