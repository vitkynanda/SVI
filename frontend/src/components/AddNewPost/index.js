import React from "react";
import LatestPostList from "./LatestPostList";
import PostForm from "./PostForm";

const index = () => {
  return (
    <div className="flex">
      <PostForm />
      <LatestPostList />
    </div>
  );
};

export default index;
