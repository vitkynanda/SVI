import React from "react";
import PublishedTable from "./PublishedTable";

const index = ({ data, isLoading, refetch }) => {
  return (
    <div className="py-3">
      <PublishedTable data={data} isLoading={isLoading} refetch={refetch} />
    </div>
  );
};

export default index;
