import { Box } from "@chakra-ui/react";
import React, { memo } from "react";

export const MenuList = memo(() => {
  return (
    <Box>
      <Box p="4" w="40vw" bg="teal" h="20vh">
        マイページ
      </Box>
      <Box p="4" w="40vw" bg="teal.500" h="20vh">
        掲示板
      </Box>
      <Box p="4" w="40vw" bg="teal.100" h="20vh">
        メッセージ
      </Box>
    </Box>
  );
});
