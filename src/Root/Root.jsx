import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
};

export default Root;
