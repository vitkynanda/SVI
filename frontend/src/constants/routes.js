const routes = [
  {
    name: "Posts",
    path: "/posts",
    subroutes: [
      { name: "All Posts", path: "posts/all-post" },
      { name: "Add New", path: "posts/add-new" },
      { name: "Preview", path: "posts/preview" },
    ],
  },
];

export default routes;
