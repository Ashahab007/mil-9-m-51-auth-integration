import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  // 2.2
  const { createLoginUser } = use(AuthContext);
  console.log(createLoginUser);

  // 2.3 created handle login and get the data from the form
  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // 2.5 call the destructured createLoginUser function
    createLoginUser(email, password)
      .then((result) => console.log(result.user))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            {/* 2.4 pass handleLogIn onSubmit */}
            <form onSubmit={handleLogIn} className="fieldset">
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
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              <p>
                Don't have account? Please{" "}
                <Link className="text-blue-500 underline" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
