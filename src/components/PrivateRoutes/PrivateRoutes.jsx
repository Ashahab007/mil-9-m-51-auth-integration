import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";

// 5.0 As from 4.0 we have created to show some button after login and hide after logout. But there is a problem, after logout if u manually type in search bar by the component path name it will redirect that page. For this reason we need to create a private route stop that redirection if user not logged in.

// 5.3 pass the children as props which is given by default by react router
const PrivateRoutes = ({ children }) => {
  // 5.1 get the user status

  const { user } = use(AuthContext);
  console.log(user);
  // 5.2 make a condition that user is present or not
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  //   5.4 return the children
  return children;
};

export default PrivateRoutes;
