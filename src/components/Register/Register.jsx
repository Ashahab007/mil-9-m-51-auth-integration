// import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { use } from "react";
import { Link, Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
// import { auth } from "../../firebase.init";

const Register = () => {
  // 1.12 checking that are we getting the useInfo here
  // const userInfo = use(AuthContext);
  // console.log(userInfo); //as the useInfo contains the function createUser so destructured it in 1.13

  // 1.13 destructuring it for calling and commented 1.12

  const { createUser } = use(AuthContext);
  console.log(createUser);

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // 1.9 but there is a problem to declare createUserWithEmailAndPassword in registration form as per firebase documentation way i.e it will accessible only here we cannot share the data overall application. That's why it's commented. We will do the following things by divide it in segment.

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((result) => console.log(result.user))
    //   .catch((err) => console.log(err.message));

    // 1.14 Now call the function to get email and password. Now Fill up the registration and see the data in console.
    createUser(email, password)
      .then((result) => console.log(result.user))
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Name"
                name="name"
              />
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <div>
                <p>
                  Already have account?
                  <Link to="/login" className="text-blue-500 underline ml-2">
                    Login
                  </Link>
                </p>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
