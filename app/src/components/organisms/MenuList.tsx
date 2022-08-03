import { Box } from "@chakra-ui/react";
import React, { memo } from "react";

export const MenuList = memo(() => {
  return (
    <Box maxW="1200px">
      <Box p="4" bg="teal">
        マイページ
      </Box>
      <Box p="4" bg="teal.500">
        掲示板
      </Box>
      <Box p="4" bg="teal.100">
        メッセージ
      </Box>
    </Box>
  );
});
