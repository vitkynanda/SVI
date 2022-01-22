import React from "react";
import Header from "../components/UI/Header";
import AddNewPost from "../components/AddNewPost";

const AddNew = () => {
  return (
    <div className="flex-grow">
      <Header title="Add New Post" />
      <AddNewPost />
    </div>
  );
};

export default AddNew;
