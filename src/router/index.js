import { lazy } from "react";
export default [
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("pages/login"))
  },
  {
    path: "/layout",
    name: "layout",
    component: lazy(() => import("pages/layout")),
    childrens: [
      {
        path: "/layout/home",
        name: "home",
        component: lazy(() => import("pages/home"))
      },
      {
        path: "/layout/list",
        name: "list",
        component: lazy(() => import("pages/list"))
      }
    ]
  }
];
