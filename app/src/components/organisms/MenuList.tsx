import { Box } from "@chakra-ui/react";
import React, { memo } from "react";
import { Link } from "react-router-dom";

export const MenuList = memo(() => {
  return (
    <Box maxW="1200px">
      <Box p="4" bg="teal">
        <Link to="/mypage">マイページ</Link>
      </Box>
      <Box p="4" bg="teal.500">
        <Link to="/posts">掲示板</Link>
      </Box>
      <Box p="4" bg="teal.100">
        メッセージ
      </Box>
    </Box>
  );
});
