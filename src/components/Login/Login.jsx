import React, { use } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  // 2.2
  const { createLoginUser } = use(AuthContext);
  console.log(createLoginUser);

  // 10.3 as the dashboard redirects to login page so another useLocation is set in Login page

  const location = useLocation();
  console.log(location); //Now we can get the state in console that is set in PrivateRoutes

  // 8.0 now my requirement is after login go to a specific page thats why use useNavigate
  const navigate = useNavigate();

  // 2.3 created handle login and get the data from the form
  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // 2.5 call the destructured createLoginUser function and pass the email, password as parameter
    createLoginUser(email, password)
      .then((result) => {
        console.log(result.user);
        // 8.1 use navigate here after user status found
        // navigate("/");

        // 10.4 as we found the state now we will redirect page conditionally as the state is null it will redirect to home page otherwise it will open the desired page.
        navigate(location.state ? location.state : "/");
      })
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
