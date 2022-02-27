import React from "react";
import Layout from "../components/Layout";
import { TabMenu } from "../components/AllPosts";

const AllPosts = () => {
  return (
    <Layout title="All Posts">
      <TabMenu />
    </Layout>
  );
};

export default AllPosts;
