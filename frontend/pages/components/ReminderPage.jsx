import React from "react";
import Reminders from "./Reminders";
import Sidebar from "../src/components/sidebar/Sidebar";
import Navbar from "../src/components/navbar/Navbar";
import UserSidebar from "../src/components/sidebar/UserSidebar";

const ReminderPage = () => {
  return (
    <div>
      <div className="list">
        <UserSidebar />
        <div className="listContainer">
          <Navbar />
          <Reminders />
        </div>
      </div>
    </div>
  );
};

export default ReminderPage;
