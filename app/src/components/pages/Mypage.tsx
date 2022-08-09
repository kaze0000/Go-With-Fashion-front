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
  Spinner,
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
import { ImProfile, ImTwitter } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";

import { useBrand } from "../../hooks/brand/useBrand";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useUserImage } from "../../hooks/useUserImage";
import { useUserProfile } from "../../hooks/useUserProfile";
import Subject from "../atoms/Subject";
import { MenuList } from "../organisms/MenuList";
import UserImageForm from "../organisms/UserImageForm";
import UserProfileForm from "../organisms/UserProfileForm";
import { HeaderLayout } from "../templates/HeaderLayout";
import { Link } from "react-router-dom";

const Mypage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { fetchLoggedInUser } = useLoggedInUser();
  const { fetchUserProfile, userProfile } = useUserProfile();
  const { fetchUserImage, userImage, isLoading } = useUserImage();
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
      <Flex>
        <Box borderRight="1px solid #EDF2F7" px="2%">
          <Heading
            as="h2"
            my="4"
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
          >
            <ImProfile
              size={"2.2rem"}
              style={{
                display: "inline-block",
              }}
            />
            プロフィール
          </Heading>
          <Divider mb="6" />
          <Box overflow={"auto"} h="100vh" px="2%">
            <Box>
              {isLoading ? (
                <Spinner display={"block"} mx="auto" />
              ) : (
                <Image
                  w="100%"
                  h="auto"
                  src={
                    userImage
                      ? userImage.image.url
                      : "http://localhost:3000/fallback/default.png"
                  }
                />
              )}
            </Box>
            <Box my="4">
              <UserImageForm fetchUserImage={fetchUserImage} />
            </Box>
            <Divider />
            <Box my="4">
              <Text fontSize="lg" fontWeight="bold" mb="2">
                自己紹介
              </Text>
              <Box as="span" overflow={"auto"} maxH="200px" height={"100%"}>
                <Textarea
                  minH={"200px"}
                  value={
                    userProfile ? userProfile.self_introducement : "未入力"
                  }
                />
              </Box>
              <Box my="2%" textAlign={"right"}>
                {userProfile && userProfile.twitter ? (
                  <Link target={"_blank"} to={userProfile.twitter}>
                    <Box
                      backgroundColor="#242424"
                      display="inline-block"
                      borderRadius="full"
                      padding="2%"
                      ml="2"
                    >
                      <ImTwitter color="white" fontSize={"1.5rem"} />
                    </Box>
                  </Link>
                ) : (
                  <Box display="inline-block" ml="2">
                    <ImTwitter fontSize={"1,5rem"} />
                  </Box>
                )}
                {userProfile && userProfile.instagram ? (
                  <Link target={"_blank"} to={userProfile.instagram}>
                    <Box
                      backgroundColor="#242424"
                      display="inline-block"
                      borderRadius="full"
                      padding="2%"
                      ml="2"
                    >
                      <BsInstagram color="white" fontSize={"1.5rem"} />
                    </Box>
                  </Link>
                ) : (
                  <Box display="inline-block" ml="2">
                    <BsInstagram fontSize={"1.5rem"} />
                  </Box>
                )}
              </Box>
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
                        colorScheme="gray"
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
            <Button backgroundColor={"yellow"} onClick={onClickUserProfileForm}>
              プロフィールを入力 / 編集
            </Button>
          </Box>
        </Box>
        {isEdit && (
          <UserProfileForm userProfile={userProfile} setIsEdit={setIsEdit} />
        )}
      </Flex>
    </HeaderLayout>
  );
};

export default Mypage;
