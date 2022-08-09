import { Box } from "@chakra-ui/react";
import React, { memo } from "react";
import { Link } from "react-router-dom";

export const MenuList = memo(() => {
  return (
    <Box maxW="1200px">
      <Link to="/mypage">
        <Box p="4" bg="teal">
          マイページ
        </Box>
      </Link>
      <Link to="/posts">
        <Box p="4" bg="teal.500">
          掲示板
        </Box>
      </Link>
      <Link to="/messages">
        <Box p="4" bg="teal.100">
          メッセージ
        </Box>
      </Link>
    </Box>
  );
});
