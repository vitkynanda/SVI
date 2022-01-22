import React from "react";
import Header from "../components/UI/Header";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-grow">
      <Header title="Posts" />
      <div className="grid grid-cols-3 gap-10 p-5">
        <div
          className="flex flex-col items-center justify-center cursor-pointer text-gray-700 bg-gray-100 space-y-2 hover:bg-gray-400 hover:text-white transition-all duration-300 border border-gray-300 rounded-lg h-32"
          onClick={() => navigate("/posts/all-post")}
        >
          <p>All Posts</p>
          <DynamicFeedIcon fontSize="large" />
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer text-gray-700 bg-gray-100 space-y-2 hover:bg-gray-400 hover:text-white transition-all duration-300 border border-gray-300 rounded-lg h-32"
          onClick={() => navigate("/posts/add-new")}
        >
          <p>Add New Post</p>
          <PostAddIcon fontSize="large" />
        </div>
        <div
          className="flex flex-col items-center justify-center cursor-pointer text-gray-700 bg-gray-100 space-y-2 hover:bg-gray-400 hover:text-white transition-all duration-300 border border-gray-300 rounded-lg h-32"
          onClick={() => navigate("/posts/preview")}
        >
          <p>Preview</p>
          <PreviewIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Posts;
