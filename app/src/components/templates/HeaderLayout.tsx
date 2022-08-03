import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { memo, ReactNode } from "react";
import { MenuList } from "../organisms/MenuList";

type Props = {
  children: ReactNode;
};

export const HeaderLayout = memo((props: Props) => {
  const { children } = props;
  return (
    <Box maxW="1280px" mx="auto">
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"300px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          Header
        </GridItem>
        <GridItem bg="pink.300" area={"nav"}>
          <MenuList />
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          {children}
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
});
