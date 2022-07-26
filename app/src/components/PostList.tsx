import React from "react";
import { PostItem } from "./PostItem";
import { Post } from "../interfaces/index";

interface PostListProps {
  posts: Post[];
  setPosts: Function;
}

export const PostList: React.FC<PostListProps> = ({ posts, setPosts }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Posts</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post: Post, index: number) => {
          return <PostItem key={index} post={post} setPosts={setPosts} />;
        })}
      </tbody>
    </table>
  );
};
