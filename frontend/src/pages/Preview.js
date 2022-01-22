import React from "react";
import Header from "../components/UI/Header";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAllArticle } from "../constants/api";
import PostCard from "../components/Preview/PostCard";

const Preview = () => {
  const [params, setParams] = useState({
    limit: 10,
    offset: 0,
    page: 1,
  });
  const { data, isLoading } = useQuery(["getAllArtilce", params], () =>
    getAllArticle(params)
  );

  const renderLoading = isLoading ? (
    <div className="flex items-center">
      <p className="text-gray-500 text-sm ">Loading data ...</p>
    </div>
  ) : (
    <div />
  );
  return (
    <div className="w-5/6">
      <Header title="Preview" />
      <div className="p-3">
        <div className="flex items-center space-x-5 justify-between mb-3">
          {renderLoading}

          <div className="space-x-3 flex items-center">
            <p>Page : {params.page}</p>
            <button
              onClick={() => {
                if (params.page > 1) {
                  setParams((prev) => {
                    return {
                      ...prev,
                      page: prev.page - 1,
                      offset: (prev.page - 1) * prev.limit,
                    };
                  });
                }
              }}
              className="text-sm p-2 px-3 bg-blue-500 text-white rounded-md"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setParams((prev) => {
                  return {
                    ...prev,
                    page: prev.page + 1,
                    offset: (prev.page + 1) * prev.limit,
                  };
                })
              }
              className="text-sm p-2 px-3 bg-blue-500 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </div>
        <div className="grid gap-5 grid-cols-4">
          {data?.data
            ?.filter((postData) => postData.status === "Published")
            .map((post) => (
              <PostCard data={post} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
