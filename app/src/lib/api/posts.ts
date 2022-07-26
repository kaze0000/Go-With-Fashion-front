import client from "./client";
import { Post } from "../../interfaces/index";

export const getPosts = () => {
  return client.get("/posts");
};

export const createPost = (data: Post) => {
  return client.post("/posts", data);
};

export const deletePost = (id: number) => {
  return client.delete(`/posts/${id}`);
};
