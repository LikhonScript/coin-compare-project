import React from "react";
import Navbar from "../navbar/Navbar";
import UserSidebar from "../sidebar/UserSidebar";
import Profile from "./Profile";
import UserTable from "./UserTable";

const DisplayUserProfile = () => {
  return (
    <div>
      <div className="list">
        <UserSidebar />
        <div className="listContainer">
          <Navbar />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default DisplayUserProfile;
