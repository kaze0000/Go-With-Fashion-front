import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import React, { memo, ReactNode } from "react";
import { useLogout } from "../../hooks/useLogout";
import { MenuList } from "../organisms/MenuList";

type Props = {
  children: ReactNode;
};

export const HeaderLayout = memo((props: Props) => {
  const { children } = props;

  const { logout } = useLogout();

  return (
    <Box maxW="1280px" mx="auto">
      <Grid
        templateAreas={`"header header"
                  "nav main"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"300px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          Header
          <Button onClick={() => logout()}>ログアウト</Button>
        </GridItem>
        <GridItem bg="white.300" area={"nav"}>
          <MenuList />
        </GridItem>
        <GridItem pl="2" mb="10" bg="white.300" area={"main"}>
          {children}
        </GridItem>
      </Grid>
    </Box>
  );
});
