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

const UserCoinTable = () => {
  const [coinData, setCoinData] = useState([]);

  const getCoinData = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/products",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      const requestedCoins = data.products.filter((curElem) => {
        return curElem.isApproved == true;
      });
      console.log(`requested${requestedCoins}`);

      setCoinData(requestedCoins);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // const requestedCoins = coinJSON.data.filter((value) => value.attributes.isApproved === false);
  };

  useEffect(() => {
    getCoinData();
  }, []);
  console.log(coinData);
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
                      <img
                        src={curElem.image}
                        alt="image img"
                        className="image"
                      />
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
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserCoinTable;
