import { Box, Divider, Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";

type Props = {
  listTitle: string;
  listContent: any;
};

export const UserProfileList = (props: Props) => {
  const { listTitle, listContent } = props;
  return (
    <>
      <Flex justifyContent="space-between" align="center" mb="4">
        <Box>
          <Icon viewBox="0 0 200 200" color="red.500" pr="2">
            <path
              fill="currentColor"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
          <span>{listTitle}</span>
        </Box>
        <span>{listContent}</span>
      </Flex>
    </>
  );
};
