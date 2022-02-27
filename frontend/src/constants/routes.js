import DashboardIcon from "@mui/icons-material/Dashboard";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    isVisited: false,
    icon: <DashboardIcon />,
  },
  {
    name: "Posts",
    path: "/posts",
    isVisited: false,
    icon: <DynamicFeedIcon />,
    subroutes: [
      { name: "All Posts", path: "/posts/all-post" },
      { name: "Add New", path: "/posts/add-new" },
      { name: "Preview", path: "/ posts/preview" },
    ],
  },
];

export default routes;
