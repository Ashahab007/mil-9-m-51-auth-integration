import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Root from "../Root/Root";
import Order from "../components/Order/Order";
import MyList from "../components/MyList/MyList";

// 1.0 If i want to share the state of user  authentication data across  the application i.e is user is logged in. this logged in status is shown  in other tabs of navbar. generally we can use context api. but i have to show the data in multiple section of the web. in that case context api cannot be used. it cannot give reusability. my requirement is reusability. i.e this authentication status is used in registration, navbar, login. That's why created a context folder in src file. created 2 file 1. AuthContext, AuthProvider.

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      { path: "order", Component: Order },
      { path: "mylist", Component: MyList },
    ],
  },
]);
