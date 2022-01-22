import React from "react";
import Header from "../components/UI/Header";
import { TabMenu } from "../components/AllPosts";

const AllPosts = () => {
  return (
    <div className="flex-grow">
      <Header title="All Posts" />
      <TabMenu />
    </div>
  );
};

export default AllPosts;
