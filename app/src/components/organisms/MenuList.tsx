import { Box } from "@chakra-ui/react";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

export const MenuList = memo(() => {
  const { logout } = useLogout();
  return (
    <Box maxW="1200px" borderRight={"1px solid #EDF2F7"} p="4">
      <Link to="/mypage">
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
        >
          マイページ
        </Box>
      </Link>
      <Link to="/posts">
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
        >
          掲示板
        </Box>
      </Link>
      <Link to="/messages">
        <Box
          p="4"
          bg="white"
          borderBottom={"1px solid #EDF2F7"}
          fontWeight="bold"
        >
          メッセージ
        </Box>
      </Link>
      <Box
        p="4"
        bg="white"
        borderBottom={"1px solid #EDF2F7"}
        fontWeight="bold"
        onClick={() => logout()}
      >
        ログアウト
      </Box>
    </Box>
  );
});
