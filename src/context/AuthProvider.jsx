import React from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.init";

// 1.4 by default react gives children to pass as props
const AuthProvider = ({ children }) => {
  // 1.10 declare a function createUser with email and password (here email and password is used as parameter because for the createUserWithEmailAndPassword it takes auth, email, password. auth can import, for email and password will be got by calling the createUser function with parameter from Registration.jsx ) and return the function createUserWithEmailAndPassword. This function is from  firebase documentation.
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   2.0 this register things (from 1.9) is also doing for login

  const createLoginUser = (email, password) => {
    // now from 'Sign in a user with an email address and password' from firebase documentation return the function
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 1.2 create the value by fetching or by manually set
  const userInfo = {
    // email: "pot@alu.com", //1.2
    // 1.11  set the createUser function in previously created object userInfo which will pass through below AuthContext and the data will share overall application. Primarily u can see in NavBar because it's previously created without email and password because createUser function didnt call from Registration.
    createUser,
    // 2.1
    createLoginUser,
  };

  //   3.0 Now if i fil the login form and reload it the auth state is changed and data is erased. To persist the data use go to firebase => Manage user => "Get the currently signed-in user" get the function onAuthStateChange. It works as observer i.e if change the state of the form which is login, logout and registration. following code is save the current user upon the state changed. by reload u can see it in console.

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      console.log("has current user", currentUser);
    } else {
      console.log("current user", currentUser);
    }
  });
  // 1.3 apply AuthContext, pass userInfo in value as props
  return (
    <AuthContext value={userInfo}>
      {/* 1.5 Apply the children in AuthContext from props*/}
      {children}
    </AuthContext>
  );
};
// 1.6 now go to NavBar and u can get the data from there

export default AuthProvider;
