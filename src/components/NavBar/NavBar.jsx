import React, { use } from "react";
import { Link, NavLink } from "react-router";
import AuthProvider from "../../context/AuthProvider";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  // 1.8 get the data by using AuthContext in use
  /* const userInfo = use(AuthContext);
  console.log(userInfo); */ //{email: 'pot@alu.com'}

  // 3.4 now we will destructure only passed user from userInfo
  // 4.2 receive createSignOutUser and destructure it
  const { user, createSignOutUser } = use(AuthContext);
  console.log(" passed user to NavBar", user);
  console.log(
    " receive createSignOutUser from AuthProvider",
    createSignOutUser
  );

  // 4.4 created handleSignOut
  const handleSignOut = () => {
    createSignOutUser()
      .then(() => {
        // remember, then will not take any parameter for signOut
        console.log("signout successful");
      })
      .catch((err) => console.log(err.message));
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        <li className="mr-6">Home</li>
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        <li className="mr-6">Login</li>
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        {" "}
        <li className="mr-6">Register</li>
      </NavLink>
      {/* 4.5 created two button Order and Profile with component and show that button conditionally by login and sign out. If user logged in the created button will show if not it will hide */}
      {user && (
        <>
          <NavLink
            to="/order"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            <li className="mr-6">Order</li>
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            {" "}
            <li className="mr-6">Profile</li>
          </NavLink>
        </>
      )}
      {/* 9.0 My requirement is created a Component which will be created by private route and user if not logged in the button will be visible in navbar but upon click it will redirect to the login page */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        <li className="mr-6">Dashboard</li>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {/* 3.5 now my button will toggle if user is sign in or sign out  */}
        {user ? (
          // 4.3 create handleSignOut & showing the user email
          <>
            {user.email}
            <a onClick={handleSignOut} className="btn">
              Sign Out
            </a>
          </>
        ) : (
          <Link className="btn" to="/login">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
