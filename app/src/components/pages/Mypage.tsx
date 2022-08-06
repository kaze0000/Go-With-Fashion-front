import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import internal from "stream";
import { useBrand } from "../../hooks/brand/useBrand";

import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useUserImage } from "../../hooks/useUserImage";
import { useUserProfile } from "../../hooks/useUserProfile";
import Subject from "../atoms/Subject";
import { MenuList } from "../organisms/MenuList";
import UserImageForm from "../organisms/UserImageForm";
import UserProfileForm from "../organisms/UserProfileForm";
import { HeaderLayout } from "../templates/HeaderLayout";

const Mypage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { fetchLoggedInUser } = useLoggedInUser();
  const { fetchUserProfile, userProfile } = useUserProfile();
  const { fetchUserImage, userImage } = useUserImage();
  const { fetchBrands, brands } = useBrand();

  const genderList = ["未入力", "男性", "女性"];

  const onClickUserProfileForm = () => {
    setIsEdit(!isEdit);
  };

  const onClickTagCloseButton = (brand_id: any) => {
    axios
      .delete(`http://localhost:3000/api/v1/brands/${brand_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          fetchBrands();
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLoggedInUser();
    fetchUserProfile();
    fetchBrands();
  }, [isEdit]);

  useEffect(() => {
    fetchUserImage();
  }, []);

  return (
    <HeaderLayout>
      {isEdit ? (
        <Stack>
          <Subject subject="< マイページ" onClick={() => setIsEdit(false)} />
          <UserProfileForm userProfile={userProfile} setIsEdit={setIsEdit} />
        </Stack>
      ) : (
        <Box>
          <Subject subject="マイページ" />
          <Image
            maxW="600px"
            w="100%"
            h="auto"
            src={
              userImage
                ? userImage.image.url
                : "http://localhost:3000/fallback/default.png"
            }
          />
          <UserImageForm fetchUserImage={fetchUserImage} />
          <Box my="4">
            <Text fontSize="lg">自己紹介</Text>
            <Textarea
              value={userProfile ? userProfile.self_introducement : "未入力"}
            />
          </Box>
          <List spacing={4} my="4">
            <ListItem>
              <ListIcon color="teal.500" />
              名前: {userProfile ? userProfile.name : "未入力"}
            </ListItem>
            <ListItem>
              <ListIcon color="green.500" />
              年齢: {userProfile ? userProfile.age : 0}歳
            </ListItem>
            <ListItem>
              <ListIcon color="green.500" />
              性別: {userProfile ? genderList[userProfile.gender] : "未入力"}
            </ListItem>
            <ListItem>
              <ListIcon color="green.500" />
              好きなブランド:
              {brands
                ? brands.map((brand) => (
                    <Tag
                      size="sm"
                      key={brand.id}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="yellow"
                    >
                      <TagLabel>{brand.name}</TagLabel>
                      <TagCloseButton
                        onClick={() => onClickTagCloseButton(brand.id)}
                      />
                    </Tag>
                  ))
                : "未入力"}
            </ListItem>
          </List>
          <Button onClick={onClickUserProfileForm}>
            プロフィールを入力/編集
          </Button>
        </Box>
      )}
    </HeaderLayout>
  );
};

export default Mypage;
