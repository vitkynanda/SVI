import React from "react";
import TrashTableDev from "./TrashTableDev";

const index = ({ data, isLoading }) => {
  return (
    <div className="py-3">
      <TrashTableDev data={data} isLoading={isLoading} />
    </div>
  );
};

export default index;
