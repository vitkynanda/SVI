import React, { useState } from "react";
import routes from "../../constants/routes";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Collapse } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-900 text-white py-5 w-60">
      <h1 className="font-semibold text-2xl px-3">Sharing Vision</h1>
      <div className="mt-5">
        {routes.map((route, id) => (
          <div key={id}>
            <div
              className={`bg-blue-700 py-2 px-3 hover:bg-gray-200 transition-all duration-300 h-12 flex flex-col justify-center`}
            >
              <span className="flex items-center justify-between">
                <span onClick={() => navigate(`${route.path}`)}>
                  {route.name}
                </span>
                {route.subroutes && (
                  <IconButton onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                )}
              </span>
            </div>

            <Collapse in={open} timeout="auto" unmountOnExit>
              {route?.subroutes?.map((subroute, idx) => (
                <div key={idx} className="flex flex-col space-y-5">
                  <NavLink
                    className={(isActive) =>
                      isActive
                        ? `bg-blue-600 py-2 px-3`
                        : `py-2 px-3 hover:bg-gray-200 transition-all duration-300 `
                    }
                    to={subroute.path}
                  >
                    {subroute.name}
                  </NavLink>
                </div>
              ))}
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
