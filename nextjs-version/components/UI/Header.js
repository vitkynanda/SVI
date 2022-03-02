import React from "react";

const Header = ({ title }) => {
  return (
    <div className="p-4 border-b border-gray-300 w-full  bg-gray-100 ">
      <p className="font-semibold text-xl text-gray-700">{title}</p>
    </div>
  );
};

export default Header;
