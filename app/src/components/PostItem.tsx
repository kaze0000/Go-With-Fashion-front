import React from "react";
import { deletePost } from "../lib/api/posts";
import { Post } from "../interfaces/index";

interface PostItemProps {
  post: Post;
  setPosts: Function;
}

export const PostItem: React.FC<PostItemProps> = ({ post, setPosts }) => {
  const handleDeletePost = async (id: number) => {
    try {
      const res = await deletePost(id);
      if (res.status == 200) {
        setPosts((prev: Post[]) => prev.filter((post: Post) => post.id !== id));
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr>
      <td>{post.title}</td>
      {/* <td>{post&.content}</td> */}
      <td>
        <button onClick={() => handleDeletePost(post.id || 0)}>Delete</button>
      </td>
    </tr>
  );
};
