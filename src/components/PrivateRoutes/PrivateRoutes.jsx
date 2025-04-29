import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";

// 5.0 As from 4.0 we have created to show some button after login and hide after logout. But there is a problem, after logout if u manually type in search bar by the component path name it will redirect that page. For this reason we need to create a private route stop that redirection if user not logged in.

// 5.3 pass the children as props which is given by default by react router

const PrivateRoutes = ({ children }) => {
  // 5.1 get the user status
  // 6.3 receive the loading from Context
  const { user, loading } = use(AuthContext);
  console.log(user);

  //   6.4 show the loading spinner during redirection i.e before checking user status it will loading. This loading will show those components that are created in PrivateRoutes.
  if (loading) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }

  // 5.2 make a condition that user is present or not
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  //   5.4 return the children
  return children;
};

export default PrivateRoutes;
