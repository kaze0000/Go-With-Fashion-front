import { Box, Flex } from "@chakra-ui/react";
import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { Search2Icon } from "@chakra-ui/icons";
import { FaTelegramPlane } from "react-icons/fa";

import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useLogout } from "../../hooks/useLogout";

export const MenuList = memo(() => {
  const { logout } = useLogout();
  const navigation = useNavigate();
  const { fetchLoggedInUser, user } = useLoggedInUser();

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <Box maxW="1200px" borderRight={"1px solid #EDF2F7"} p="4">
      <Link to="/mypage">
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
        >
          <Flex alignItems={"center"}>
            <ImProfile
              style={{
                marginRight: "2%",
              }}
            />
            マイページ
          </Flex>
        </Box>
      </Link>
      <Link to="/posts">
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
        >
          <Flex alignItems={"center"}>
            <Search2Icon
              style={{
                marginRight: "2%",
              }}
            />
            掲示板
          </Flex>
        </Box>
      </Link>
      <Link to="/messages">
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
        >
          <Flex alignItems={"center"}>
            <FaTelegramPlane
              style={{
                marginRight: "2%",
              }}
            />
            メッセージ
          </Flex>
        </Box>
      </Link>
      {user ? (
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
          onClick={() => logout()}
        >
          <Flex alignItems={"center"}>
            <FiLogOut
              style={{
                marginRight: "2%",
              }}
            />
            ログアウト
          </Flex>
        </Box>
      ) : (
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
          color={"#fff"}
          backgroundColor={"blue.500"}
          onClick={() => {
            navigation("/login");
          }}
        >
          <Flex alignItems={"center"}>
            <FiLogIn
              style={{
                marginRight: "2%",
              }}
            />
            ログイン
          </Flex>
        </Box>
      )}
    </Box>
  );
});
