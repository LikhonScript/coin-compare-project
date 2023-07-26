// import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CoinTable = () => {
  const [coinData, setCoinData] = useState([]);

  const getCoinData = async (req, res) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/products", {
      withCredentials: true,
    });

    // const requestedCoins = coinJSON.data.filter((value) => value.attributes.isApproved === false);
    const requestedCoins = data.products.filter((curElem) => {
      return curElem.isApproved == false;
    });
    console.log(`requested${requestedCoins}`);

    setCoinData(requestedCoins);
    console.log(data);
  };
  const approveCoinRequest = (coinData) => {
    axios
      .put(
        `http://localhost:4000/api/v1/product/${coinData._id}`,
        {
          isApproved: true,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
        getCoinData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const rejectCoinRequest = (coinData) => {
    axios
      .delete(`http://localhost:4000/api/v1/product/${coinData._id}`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        getCoinData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCoinData();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> SR#</TableCell>
            <TableCell className="tableCell">COIN</TableCell>
            <TableCell className="tableCell">SYMBOL</TableCell>
            <TableCell className="tableCell">TOTAL SUPPLY</TableCell>
            <TableCell className="tableCell">MAX SUPPLY</TableCell>
            <TableCell className="tableCell">CONTRACT ADDRESS</TableCell>
            <TableCell className="tableCell">EXPLORER</TableCell>
            <TableCell className="tableCell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinData.length > 0 &&
            coinData.map((curElem, index) => {
              return (
                <TableRow key={index + 1}>
                  <TableCell className="tableCell">{index + 1}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={curElem.image} alt="" className="image" />
                      {curElem.Title}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{curElem.Symbol}</TableCell>
                  <TableCell className="tableCell">
                    {curElem.totalSupply}
                  </TableCell>
                  <TableCell className="tableCell">
                    {curElem.maxSupply}
                  </TableCell>
                  <TableCell className="tableCell">
                    {curElem.contractAddress}
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className="">{curElem.explorer}</span>
                  </TableCell>
                  <TableCell className="tableCell">
                    <div className="flex">
                      <button
                        onClick={(e) => approveCoinRequest(curElem)}
                        type="button"
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => rejectCoinRequest(curElem)}
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Reject
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinTable;
