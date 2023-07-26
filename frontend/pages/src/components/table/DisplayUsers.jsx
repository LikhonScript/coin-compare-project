import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import UserTable from "./UserTable";

const DisplayUsers = () => {
  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
