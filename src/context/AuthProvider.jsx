import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.init";

// 1.4 by default react gives children to pass as props
const AuthProvider = ({ children }) => {
  // 3.2 as we can save the user from 3.1, so we want to use the save data. For this we have to use  useState
  const [user, setUser] = useState(null);

  // 6.0 as we setup a private route on 5.0 but after login if we reload it for a few miliseconds it shows login then sign out. because it sends the data to check that user is login or logout which takes some miliseconds. for better user experience, to solve this use loading spinner which takes two states
  const [loading, setLoading] = useState(true);

  // 1.10 declare a function createUser with email and password (here email and password is used as parameter because for the createUserWithEmailAndPassword it takes auth, email, password. auth can import, for email and password will be got by calling the createUser function with parameter from Registration.jsx ) and return the function createUserWithEmailAndPassword. This function is from  firebase documentation.
  const createUser = (email, password) => {
    setLoading(true); //6.5 showing loading spinner but not working
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   2.0 this register things (from 1.9) is also doing for login

  const createLoginUser = (email, password) => {
    setLoading(true); //6.5 showing loading spinner but not working
    // now from 'Sign in a user with an email address and password' from firebase documentation return the function
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 4.0 Now my requirement is onclick to sign out button the user will signout. that's why createSignOutUser is created like createLoginUser. call the signOut() function from documentation from password authentication 'Enable email enumeration protection'.

  const createSignOutUser = () => {
    setLoading(true); //6.5 showing loading spinner but not working
    return signOut(auth); //takes one parameter auth
  };

  //   3.0 Now if i fill the login form and reload it the auth state is changed and data is erased. To persist the data use go to firebase => Manage user => "Get the currently signed-in user" get the function onAuthStateChange. It works as observer i.e if change the state  of the form in firebase which is login, logout and registration. following code save the current user upon the state changed. by reload u can see it in console. the following code is created for checking purpose that's why commented.

  /*  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      console.log("has current user", currentUser);
    } else {
      console.log("current user", currentUser);
    }
  });
 */

  // 3.1 use observer inside useEffect. The following code is combinedly written from react useEffect 'Connecting to an external system' and from firebase 'Get the currently signed-in user'.
  // i. useEffect is used for set the observer one time.
  // ii. clean up memory after unmount the application i.e closing the web
  // iii. now fill the login form then reload it after login button pressed and see the result in console. This type of problem is solved in this way using firebase user state manage.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("inside useEffect on auth state change", currentUser);
        // 3.3 get the saved currentUser
        setUser(currentUser);
        // 6.1 set the setLoading false
        setLoading(false);
      }
      return () => {
        //this return is used to clean up memory after unmount the application or reload
        unsubscribe();
      };
    });
  }, []);

  // 1.2 create the value by fetching or by manually set
  const userInfo = {
    // email: "pot@alu.com", //1.2
    // 1.11  set the createUser function in previously created object userInfo which will pass through below AuthContext and the data will share overall application. Primarily u can see in NavBar because it's previously created without email and password because createUser function didn't call from Registration.
    createUser,
    // 2.1
    createLoginUser,
    // 3.3 pass the user in userInfo so we can get the user data from any where from the application
    user,
    // 4.1 pass to the context
    createSignOutUser,
    // 6.2 pass to the context to show the loading state also in PrivateRoutes
    loading,
  };

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
