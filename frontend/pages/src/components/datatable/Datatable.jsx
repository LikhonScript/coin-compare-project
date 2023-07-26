// import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import CoinTable from "../table/CoinTable";
import AdTable from "../table/AdTable";

const Datatable = () => {
  return (
    <div className="datatable">
      Coin Requests
      <CoinTable />
      <br />
      <br />
      <br />
      Ad Requests
      <AdTable />
    </div>
  );
};

export default Datatable;
