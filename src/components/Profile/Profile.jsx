import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext";
// 7.0 Showing the user information in profile via private route

const Profile = () => {
  // 7.1 get the data from AuthProvider
  const { user } = use(AuthContext);

  console.log(user);
  // 7.2 show the user data to UI
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-center text-2xl font-bold">Profile</h1>
      <h3 className="text-center">{user.email}</h3>
    </div>
  );
};

export default Profile;
