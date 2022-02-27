import React from "react";
import PublishedTableDev from "./PublishedTableDev";

const index = ({ data, isLoading, refetch }) => {
  return (
    <div className="py-3">
      <PublishedTableDev data={data} isLoading={isLoading} refetch={refetch} />
    </div>
  );
};

export default index;
