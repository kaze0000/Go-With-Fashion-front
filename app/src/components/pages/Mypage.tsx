import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
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
import { useMessage } from "../../hooks/useMessage";

const Mypage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { showMessage } = useMessage();

  const { fetchLoggedInUser, user } = useLoggedInUser();
  const { fetchUserProfile, userProfile } = useUserProfile();
  const { fetchUserImage, userImage, isLoading } = useUserImage();
  const { fetchBrands, brands } = useBrand();

  const genderList = ["未入力", "男性", "女性"];

  const onClickUserProfileForm = () => {
    if (user) {
      setIsEdit(!isEdit);
    } else {
      showMessage({ title: "ログインしてください。", status: "info" });
    }
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
        <Box borderRight="1px solid #EDF2F7" px="2%" maxW="420px" w="100%">
          <Flex alignItems={"center"} justifyContent="center">
            <ImProfile fontSize={"2rem"} />
            <Heading as="h2" my="4">
              マイページ
            </Heading>
          </Flex>
          <Divider mb="6" />
          <Box overflow={"auto"} px="2%">
            <Box maxW={"390px"} w="100%">
              {isLoading ? (
                <Spinner display={"block"} mx="auto" />
              ) : (
                <Image
                  src={
                    userImage
                      ? userImage.image.url
                      : "http://localhost:3000/fallback/default.png"
                  }
                />
              )}
            </Box>
            <Box my="4">
              <UserImageForm fetchUserImage={fetchUserImage} user={user} />
            </Box>
            <Divider />
            <Box my="4">
              <Text fontSize="lg" fontWeight="bold" mb="2">
                自己紹介
              </Text>
              <Box as="span" overflow={"auto"} maxH="200px" height={"100%"}>
                {userProfile && userProfile.self_introducement
                  ? userProfile.self_introducement
                  : "未入力"}
              </Box>
              <Box my="2%" textAlign={"right"}>
                {userProfile && userProfile.twitter ? (
                  <Link target={"_blank"} to={userProfile.twitter}>
                    <Box display="inline-block" ml="2">
                      <ImTwitter fontSize={"1.5rem"} />
                    </Box>
                  </Link>
                ) : (
                  <Box display="inline-block" ml="2" opacity={"0.1"}>
                    <ImTwitter fontSize={"1.5rem"} />
                  </Box>
                )}
                {userProfile && userProfile.instagram ? (
                  <Link target={"_blank"} to={userProfile.instagram}>
                    <Box display="inline-block" ml="2">
                      <BsInstagram color="white" fontSize={"1.5rem"} />
                    </Box>
                  </Link>
                ) : (
                  <Box display="inline-block" ml="2" opacity={"0.1"}>
                    <BsInstagram fontSize={"1.5rem"} />
                  </Box>
                )}
              </Box>
            </Box>
            <List spacing={4} my="4">
              <ListItem>
                <Icon viewBox="0 0 200 200" color="red.500" pr="2">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                名前:{" "}
                {userProfile && userProfile.name ? userProfile.name : "未入力"}
              </ListItem>
              <ListItem>
                <Icon viewBox="0 0 200 200" color="red.500" pr="2">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                年齢:{" "}
                {userProfile && userProfile.age
                  ? `${userProfile.age}歳`
                  : "未入力"}
              </ListItem>
              <ListItem>
                <Icon viewBox="0 0 200 200" color="red.500" pr="2">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                性別: {userProfile && genderList[userProfile.gender]}
              </ListItem>
              <ListItem>
                <Icon viewBox="0 0 200 200" color="red.500" pr="2">
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                好きなブランド:
                <br />
                {brands && brands.length !== 0
                  ? brands.map((brand) => (
                      <Tag
                        size="sm"
                        key={brand.id}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="gray"
                        mt="2"
                        mr="2"
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
            <Button
              backgroundColor={"yellow"}
              _hover={{ opacity: 0.8 }}
              onClick={onClickUserProfileForm}
            >
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
