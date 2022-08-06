import {
  Box,
  Button,
  ButtonGroup,
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
import React, { Children, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

import { UserProfile } from "../../type/api/UserProfile";

Modal.setAppElement("#root");

const customStyles: any = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  content: {
    position: "absolute",
    width: "40%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem",
  },
};

export const CommonModal = (props: {
  buttonName: string;
  children: ReactNode;
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const { buttonName, children } = props;
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{buttonName}</Button>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
      >
        <Box>{children}</Box>
        <Button onClick={() => setIsOpen(false)}>閉じる</Button>
      </Modal>
    </>
  );
};
