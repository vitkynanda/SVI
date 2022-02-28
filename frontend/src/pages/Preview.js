import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { useQuery } from "react-query";
import { getArticleByPage } from "../constants/api";
import PostCard from "../components/Preview/PostCard";

const Preview = () => {
  const [params, setParams] = useState({
    limit: 0,
    page: 1,
    offset: 1,
  });
  const { data, isLoading } = useQuery(["getArticlePage", params.page], () =>
    getArticleByPage(params)
  );

  const renderLoading = isLoading ? (
    <div className="flex items-center">
      <p className="text-gray-500 text-sm ">Loading data ...</p>
    </div>
  ) : (
    <div />
  );

  const pageHandler = (type) => {
    const { page, limit } = params;
    if (type === "previous") {
      if (page > 1) {
        setParams({ ...params, page: page - 1, limit: limit - 1 });
      } else {
        setParams({ ...params, limit: page - 1 });
      }
    } else {
      setParams({ ...params, page: page + 1, limit: limit + 1 });
    }
  };

  return (
    <Layout title="Preview">
      <div className="p-3">
        <div className="flex items-center space-x-5 justify-between mb-3">
          {renderLoading}
          <div className="space-x-3 flex items-center">
            <p>Page : {params.page}</p>
            <button
              onClick={() => pageHandler("previous")}
              className="text-sm p-2 px-3 bg-blue-500 text-white rounded-md"
            >
              Prev
            </button>
            <button
              onClick={() => pageHandler("next")}
              className="text-sm p-2 px-3 bg-blue-500 text-white rounded-md"
            >
              Next
            </button>
          </div>
        </div>
        <div className="grid gap-5">
          {data?.data?.map((post, id) => (
            <PostCard data={post} key={id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Preview;
