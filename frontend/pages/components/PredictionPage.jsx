import React from "react";
import UserSidebar from "../src/components/sidebar/UserSidebar";
import { Navbar } from "flowbite-react";
import Predictions from "./Predictions";

const PredictionPage = () => {
  return (
    <div>
      <div className="list">
        <UserSidebar />
        <div className="listContainer">
          <Navbar />
          <Predictions />
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
