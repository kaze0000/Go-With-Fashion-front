import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useUserProfile } from "../../hooks/useUserProfile";
import Subject from "../atoms/Subject";
import { MenuList } from "../organisms/MenuList";
import UserImageForm from "../organisms/UserImageForm";
import UserProfileEdit from "./UserProfileEdit";

const Mypage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { fetchLoggedInUser } = useLoggedInUser();
  const { fetchUserProfile, userProfile } = useUserProfile();

  const onClickUserProfileEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    fetchLoggedInUser();
    fetchUserProfile();
    console.log(userProfile ? userProfile.self_introducement : "未入力");
  }, [isEdit]);

  return (
    <>
      <Flex>
        <MenuList />
        {isEdit ? (
          <Stack>
            <Subject subject="< マイページ" onClick={() => setIsEdit(false)} />
            <UserProfileEdit userProfile={userProfile} setIsEdit={setIsEdit} />
          </Stack>
        ) : (
          <Box>
            <UserImageForm />
            <Image src="http://localhost:3000/fallback/default.png" />
            <Subject subject="マイページ" />
            {/* <Box my="4">
              <Image
                w="540"
                h="300"
                src={
                  userProfile
                    ? userProfile.image.url
                    : "https://source.unsplash.com/photos/bwNTzXlm0fk"
                }
              />
            </Box> */}
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
                性別: {userProfile ? userProfile.gender : "未入力"}
              </ListItem>
              <ListItem>
                <ListIcon color="green.500" />
                好きなブランド: aaaaaaa aaaaaa
              </ListItem>
            </List>
            <Button onClick={onClickUserProfileEdit}>プロフィールを編集</Button>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Mypage;
