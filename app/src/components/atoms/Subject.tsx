import { Divider, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {
  subject: string;
  onClick?: () => void;
};

const Subject = (props: Props) => {
  const { subject, onClick } = props;
  return (
    <>
      <Heading as="h2" my="4" textAlign="center" onClick={onClick}>
        {subject}
      </Heading>
      <Divider mb="6" />
    </>
  );
};

export default Subject;
