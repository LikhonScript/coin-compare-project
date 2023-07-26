import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/CoinTable";
import { useEffect } from "react";
import UserTable from "../../components/table/UserTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
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
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
        </div>
        <div className="charts">
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle"> Coins </div>
          <Table />
          <br />
          <br />
          <br />
          <div className="listTitle"> Users </div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
