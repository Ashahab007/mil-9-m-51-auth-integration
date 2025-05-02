import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Root from "../Root/Root";
import Order from "../components/Order/Order";

import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes";
import Profile from "../components/Profile/Profile";
import Dashboard from "../components/Dashboard/Dashboard";

// 1.0 If i want to share the state of user  authentication data across  the application i.e is user is logged in. this logged in status is shown  in other tabs of navbar. generally we can use context api. but i have to show the data in multiple section of the web. in that case context api is used. it gives reusability. my requirement is reusability. i.e this authentication status is used in registration, navbar, login. That's why created a context folder in src file. created 2 file 1. AuthContext, AuthProvider.

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      // 5.5 use element instead of component and set the PrivateRoutes as element and in the PrivateRoutes set Order element as children. the mechanism of private route is when order path is redirected it will first goes to the PrivateRoutes and check all the conditions of PrivateRoutes if met then go to the Order page
      {
        path: "order",
        element: (
          <PrivateRoutes>
            <Order></Order>
          </PrivateRoutes>
        ),
      },
      // 7.3 set the profile to the private routes
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      // 8.2 created the path but this is not showing properly
      {
        path: "dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
