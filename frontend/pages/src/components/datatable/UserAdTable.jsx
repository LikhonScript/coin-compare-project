// import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import CoinTable from "../table/CoinTable";
import UserCoinTable from "../table/UserCoinTable";
import UserDisplayAdTable from "../table/UserDisplayAdTable";
import Banner from "../Banner";

const UserAdtable = () => {
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add new Advertisment
        <Link to="/addadvertisment" className="link">
          Add New
        </Link>
      </div>
      <Banner />
    </div>
  );
};

export default UserAdtable;
