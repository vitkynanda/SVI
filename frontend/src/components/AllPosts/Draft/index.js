import React from "react";
import DraftTable from "./DraftTable";

const index = ({ data, isLoading }) => {
  return (
    <div className="py-3">
      <DraftTable data={data} isLoading={isLoading} />
    </div>
  );
};

export default index;
