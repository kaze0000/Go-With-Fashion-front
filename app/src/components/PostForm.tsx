import React, { FC, useState } from "react";
import { createPost } from "../lib/api/posts";
import { Post } from "../interfaces/index";

interface PostFormProps {
  posts: Post[];
  setPosts: Function;
}

export const PostForm: FC<PostFormProps> = ({ posts, setPosts }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Post = {
      title: title,
      // content: content,
    };

    try {
      const res = await createPost(data);
      if (res.status == 200) {
        setPosts([...posts, res.data.post]);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      // console.log(err);
    }
    setTitle("");
    // setContent("");
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      {/* <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input> */}
      <input type="submit" value="Add" />
    </form>
  );
};
