import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { UserProfile } from "../../type/api/UserProfile";

type Props = {
  userProfile: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
};

export const UserProfileEditModal = memo((props: Props) => {
  const { userProfile, isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Stack>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input
                value={userProfile ? userProfile.name : "未入力"}
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>年齢</FormLabel>
              <Input value={userProfile ? userProfile.age : 0} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>性別</FormLabel>
              <Input
                value={userProfile ? userProfile.gender : "未入力"}
                isReadOnly
              />
            </FormControl>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
