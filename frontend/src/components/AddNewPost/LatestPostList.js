import React from "react";
import { useQuery } from "react-query";
import { getAllArticle } from "../../constants/api";
import formatFullDate from "../../helpers/formatFullDate";

const LatestPostList = () => {
  const { data } = useQuery("getAllArticle", () =>
    getAllArticle({ limit: 10, offset: 0 })
  );

  return (
    <div className="flex flex-col p-3 space-y-2 w-2/3">
      <p className="font-semibold">Latest Post Data</p>
      <div className="grid grid-cols-2 gap-5 ">
        {data?.data
          ?.filter(
            (post) => post.status === "Published" || post.status === "Drafts"
          )
          .sort((a, b) =>
            b.created_date > a.created_date
              ? 1
              : a.created_date > b.created_date
              ? -1
              : 0
          )
          .slice(0, 8)
          .map((postData) => (
            <div
              key={postData.id}
              className="hover:scale-105 transition-all duration-300 flex flex-col shadow-md text-gray-700 p-3 rounded-md items-start space-y-2"
            >
              <p className="font-semibold">{postData.title}</p>
              <p className="text-sm">{postData.content}</p>
              <div className="flex items-center justify-between text-xs w-full">
                <p
                  className={`${
                    postData.status === "Published"
                      ? "bg-blue-400"
                      : "bg-orange-500"
                  } rounded-2xl text-xs text-white p-1 px-2 shadow-md`}
                >
                  {postData.category}
                </p>
                <di>{formatFullDate(postData.updated_date)}</di>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LatestPostList;
