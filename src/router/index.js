import { lazy } from "react";
export default [
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("pages/login")),
  },
  {
    path: "/",
    name: "layout",
    component: lazy(() => import("pages/layout")),
    childrens: [
      {
        path: "/home",
        name: "home",
        component: lazy(() => import("pages/home")),
      },
    ],
  },
];
