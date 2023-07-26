import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/CoinTable";
import { useEffect, useContext, useState } from "react";
import UserSidebar from "../../components/sidebar/UserSidebar";
import UserWidget from "../../components/widget/UserWidget";
import UserCoinTable from "../../components/table/UserCoinTable";
import UserAdsTable from "../../components/table/UserAdsTable";
import SignUpForm from "../forms/SignUpForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinMarketContext } from "../../../../context/context";
import TransferData from "../../components/TransferData";

const UserHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loginVerify = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        if (!data.success) navigate("/login");
      } catch (error) {
        console.log(`error ${error}`);
      }
    };
    loginVerify();
  }, []);

  return (
    <div className="home">
      <UserSidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <UserWidget type="coins" />
          <UserWidget type="ads" />
        </div>
        <div className="charts">
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <UserCoinTable />
          <UserAdsTable />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
