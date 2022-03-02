import React, { useState } from "react";
import { useQuery } from "react-query";
import { getArticleByPage } from "../../constants/api";
import Layout from "../../components/Layout";
import PostCard from "../../components/Preview/PostCard";
import { Skeleton } from "@mui/material";

const Preview = () => {
  const [params, setParams] = useState({
    limit: 0,
    page: 1,
    offset: 1,
  });
  const { data, isLoading } = useQuery(
    ["getArticlePage", params.limit, params.offset],
    () => getArticleByPage(params)
  );

  const pageHandler = (type) => {
    const { page, limit } = params;
    if (type === "previous") {
      if (page > 1) {
        setParams({ ...params, page: page - 1, limit: Number(limit) - 1 });
      } else {
        setParams({ ...params, limit: page - 1 });
      }
    } else {
      setParams({ ...params, page: page + 1, limit: Number(limit) + 1 });
    }
  };

  return (
    <Layout title="Preview">
      <div className="p-3">
        <div className="space-x-3 flex items-center justify-end my-2">
          <div className="flex space-x-2">
            <p>Limit :</p>
            <input
              type="number"
              value={params.limit}
              className="w-20 border px-2"
              onChange={(e) => setParams({ ...params, limit: e.target.value })}
            />
            <p>Offset :</p>
            <input
              type="number"
              value={params.offset}
              className="w-20 border px-2"
              onChange={(e) => setParams({ ...params, offset: e.target.value })}
            />
          </div>
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

        <div className="grid gap-5">
          {data?.data?.map((post, id) =>
            isLoading ? (
              <div className="h-full">
                <Skeleton height={30} />
              </div>
            ) : (
              <PostCard data={post} key={id} />
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Preview;
