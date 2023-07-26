// import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import axios from "axios";
const UserSidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const logout = async () => {
    console.log(`clicked`);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">User</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <Link to="/userhome" className="link">
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/ads" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Ads</span>
            </li>
          </Link>
          <Link to="/usercoins" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>coins</span>
            </li>
          </Link>

          <p className="title">USEFUL</p>
          <Link to="/reminders" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Reminders</span>
            </li>
          </Link>
          <Link to="/predictions" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Predictions</span>
            </li>
          </Link>

          <Link to="/userprofile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          <li>
            <ExitToAppIcon className="icon" />
            <Link className="Link">
              <span onClick={logout}>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
