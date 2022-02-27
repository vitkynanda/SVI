import React from "react";
import DraftTableDev from "./DraftTableDev";

const index = ({ data, isLoading }) => {
  return (
    <div className="py-3">
      <DraftTableDev data={data} isLoading={isLoading} />
    </div>
  );
};

export default index;
