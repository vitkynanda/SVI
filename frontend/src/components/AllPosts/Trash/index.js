import React from "react";
import TrashTable from "./TrashTable";

const index = ({ data, isLoading }) => {
  return (
    <div className="py-3">
      <TrashTable data={data} isLoading={isLoading} />
    </div>
  );
};

export default index;
