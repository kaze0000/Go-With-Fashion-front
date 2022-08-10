import { Box, Button, Grid, GridItem, Image } from "@chakra-ui/react";
import React, { memo, ReactNode } from "react";
import { useLogout } from "../../hooks/useLogout";
import { MenuList } from "../organisms/MenuList";

type Props = {
  children: ReactNode;
};

export const HeaderOnlyLayout = memo((props: Props) => {
  const { children } = props;

  return (
    <Box>
      <Grid
        templateAreas={`"header header"
                  "main main"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"300px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
      >
        <GridItem
          area={"header"}
          backgroundImage={"http://localhost:3000/fallback/texture.png"}
          position="relative"
        >
          <Image
            src="http://localhost:3000/fallback/logo.png"
            position={"absolute"}
            left="5%"
            top={"50%"}
            transform="translate(-5%, -50%)"
          />
        </GridItem>
        <GridItem pl="2" mb="10" bg="white.300" area={"main"}>
          {children}
        </GridItem>
      </Grid>
    </Box>
  );
});
