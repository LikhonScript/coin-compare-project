// import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import CoinTable from "../table/CoinTable";
import UserCoinTable from "../table/UserCoinTable";

const UserDatatable = () => {
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add new Coin
        <Link to="/addcoin" className="link">
          Add New
        </Link>
      </div>
      <UserCoinTable />
    </div>
  );
};

export default UserDatatable;
