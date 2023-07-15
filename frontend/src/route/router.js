import { lazy } from "react";

const LazyComponent = (parentDirectory, Module) => {
  return lazy(() => /* @vite-ignore */ import(/* @vite-ignore */`../${parentDirectory}/${Module}/index.jsx`));
};

export const RouterMap = [
  {
    path: "/",
    component: LazyComponent("Layout","Common"),
    children: [
      {
        index:true,
        component:LazyComponent("Page","login"),
      }
    ]
  },
  {
    path: "/dashboard",
    component: LazyComponent("Layout","sideBar"),
    children: [
      {
        index:true,
        component:LazyComponent("Page","dashboard"),
      }
    ]
  },
];
