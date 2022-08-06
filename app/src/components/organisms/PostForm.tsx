import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Post } from "../../type/api/Post";

const PostForm = (props: any) => {
  const { posts, setIsPost } = props;

  const { register, handleSubmit } = useForm<Post>();

  const prefectures = [
    { code: 1, name: "北海道" },
    { code: 2, name: "青森県" },
    { code: 3, name: "岩手県" },
    { code: 4, name: "宮城県" },
    { code: 5, name: "秋田県" },
    { code: 6, name: "山形県" },
    { code: 7, name: "福島県" },
    { code: 8, name: "茨城県" },
    { code: 9, name: "栃木県" },
    { code: 10, name: "群馬県" },
    { code: 11, name: "埼玉県" },
    { code: 12, name: "千葉県" },
    { code: 13, name: "東京都" },
    { code: 14, name: "神奈川県" },
    { code: 15, name: "新潟県" },
    { code: 16, name: "富山県" },
    { code: 17, name: "石川県" },
    { code: 18, name: "福井県" },
    { code: 19, name: "山梨県" },
    { code: 20, name: "長野県" },
    { code: 21, name: "岐阜県" },
    { code: 22, name: "静岡県" },
    { code: 23, name: "愛知県" },
    { code: 24, name: "三重県" },
    { code: 25, name: "滋賀県" },
    { code: 26, name: "京都府" },
    { code: 27, name: "大阪府" },
    { code: 28, name: "兵庫県" },
    { code: 29, name: "奈良県" },
    { code: 30, name: "和歌山県" },
    { code: 31, name: "鳥取県" },
    { code: 32, name: "島根県" },
    { code: 33, name: "岡山県" },
    { code: 34, name: "広島県" },
    { code: 35, name: "山口県" },
    { code: 36, name: "徳島県" },
    { code: 37, name: "香川県" },
    { code: 38, name: "愛媛県" },
    { code: 39, name: "高知県" },
    { code: 40, name: "福岡県" },
    { code: 41, name: "佐賀県" },
    { code: 42, name: "長崎県" },
    { code: 43, name: "熊本県" },
    { code: 44, name: "大分県" },
    { code: 45, name: "宮崎県" },
    { code: 46, name: "鹿児島県" },
    { code: 47, name: "沖縄県" },
  ];

  const onSubmit = (data: Post) => {
    const { body, preferred_at, area_id, posted_brands } = data;

    const sendFormData = () => {
      axios
        .post(
          "http://localhost:3000/api/v1/posts",
          {
            post: {
              body: body,
              preferred_at: preferred_at,
              area_id: area_id,
            },
            posted_brands: { names: posted_brands },
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

    sendFormData();

    setTimeout(() => {
      setIsPost(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "2%" }}>
      <FormControl>
        <CloseIcon
          pos="absolute"
          right="4"
          top="0"
          onClick={() => setIsPost(false)}
        />
        <FormLabel>日程</FormLabel>
        <Input type="date" {...register("preferred_at")} />
        <FormLabel>希望エリア</FormLabel>
        <Select {...register("area_id")}>
          {prefectures.map((prefecture) => (
            <option key={prefecture.code} value={prefecture.code}>
              {prefecture.name}
            </option>
          ))}
        </Select>
        <FormLabel>見に行きたいブランド</FormLabel>
        <Input type="text" {...register("posted_brands")} />
        <FormLabel>詳細</FormLabel>
        <Input mb="6" type="text" {...register("body")} />
        <Button type="submit">送信</Button>
      </FormControl>
    </form>
  );
};

export default PostForm;
