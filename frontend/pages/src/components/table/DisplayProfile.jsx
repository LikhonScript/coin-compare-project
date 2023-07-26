import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Profile from "./Profile";
import UserTable from "./UserTable";

const DisplayProfile = () => {
  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default DisplayProfile;
