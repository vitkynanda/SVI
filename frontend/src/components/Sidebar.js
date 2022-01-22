import React, { useState } from "react";
import routes from "../constants/routes";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Collapse } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-900 text-white py-5 w-1/6">
      <h1 className="font-semibold text-2xl px-3">Sharing Vision</h1>
      <div>
        {routes.map((route, id) => (
          <div key={id}>
            <div className="flex flex-col mt-5">
              <NavLink
                onClick={() => setOpen(!open)}
                className={(isActive) =>
                  isActive
                    ? `bg-blue-700 py-1 px-3`
                    : `py-2 px-3 hover:bg-gray-200 transition-all duration-300 `
                }
                to={route.path}
              >
                <span className="flex items-center justify-between">
                  <span>{route.name}</span>

                  <IconButton>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </span>
              </NavLink>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {route.subroutes.map((subroute, idx) => (
                <div key={idx} className="flex flex-col space-y-5 text-sm">
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
