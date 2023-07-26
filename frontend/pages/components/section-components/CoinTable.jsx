import { useContext, useEffect, useRef, useState } from "react";
import { CoinMarketContext } from "../../../context/context";
import {
  HeaderCell,
  HeaderCellLeading,
  DataCell,
  DataCellLeading,
  TableRow,
  TableHead,
  TableHeadRow,
  TableBody,
  Table,
} from "./../Table";
import Link from "next/link";
import InDetails from "./InDetails";
import Reminders from "../Reminders";
import DataContext from "../DataContext";
export const formatNum = (num) => {
  return Number(num?.toFixed(2)).toLocaleString();
};

export default function CoinTable() {
  var coinsdata = useRef([]);
  let { getTopTenCoins } = useContext(CoinMarketContext);
  let [coinData, setCoinData] = useState([]);
  let [previousCoinData, setPreviousCoinData] = useState([]);
  let [nameSearch, setNameSearch] = useState("");
  let [tempData, setTempData] = useState([]);
  const style = { display: "none" };

  const groupButtonStyles =
    "py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-blue-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-blue-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-blue-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";
  const handlePrice = (value) => {
    let isIncrement = undefined;
    if (previousCoinData.length > 1) {
      if (
        formatNum(coinData[value].quote.USD.price) <
        formatNum(previousCoinData[value].quote.USD.price)
      ) {
        isIncrement = false;
      } else if (
        formatNum(coinData[value].quote.USD.price) >
        formatNum(previousCoinData[value].quote.USD.price)
      ) {
        isIncrement = true;
      } else {
      }
    }

    return { isIncrement, value: formatNum(coinData[value].quote.USD.price) };
  };

  useEffect(() => {
    const getJSON = async function () {
      try {
        let apiResponse = await getTopTenCoins();
        setPreviousCoinData(coinsdata.current);
        setCoinData(apiResponse);
        setTempData(apiResponse);
      } catch (e) {
        console.error(e.message);
      }
    };

    if (getTopTenCoins) getJSON();

    const time = setInterval(() => {
      getJSON();
    }, 60 * 1000);
  }, []);
  const handleCoinNav = (coin) => {
    console.log(coin);
    localStorage.setItem("coinData", JSON.stringify(coin));
  };
  useEffect(() => {
    coinsdata.current = coinData;
  }, [coinData]);
  const searchByName = () => {
    coinData = tempData;
    const filteredByName = coinData.filter((curElem, index) => {
      return curElem.name == nameSearch;
    });
    if (filteredByName.length == 0) alert("coin does not exsist");
    else setCoinData(filteredByName);
  };
  const filterbyVolume = (value) => {
    coinData = tempData;
    const filteredByVolume = coinData.filter((curElem, index) => {
      if (value == 2000000) return curElem.quote.USD.volume_24h > value;
      else if (value == 500000) {
        return (
          curElem.quote.USD.volume_24h > value &&
          curElem.quote.USD.volume_24h < 1000000
        );
      } else {
        return (
          curElem.quote.USD.volume_24h > value &&
          curElem.quote.USD.volume_24h < 2000000
        );
      }
    });
    setCoinData(filteredByVolume);
  };
  const sortingData = (data, option) => {
    if (option == "price") {
      const numAscending = [...data].sort(
        (a, b) => b.quote.USD.price - a.quote.USD.price
      );
      console.log("sorted", numAscending);
      setCoinData(numAscending);
    } else if (option == "marketcap") {
      const numAscending = [...data].sort(
        (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap
      );
      console.log("sorted", numAscending);
      setCoinData(numAscending);
    } else if (option == "volume") {
      const numAscending = [...data].sort(
        (a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h
      );
      console.log("sorted", numAscending);
      setCoinData(numAscending);
    } else if (option == "24h") {
      const numAscending = [...data].sort(
        (a, b) =>
          b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
      );
      console.log("sorted", numAscending);
      setCoinData(numAscending);
    } else if (option == "7d") {
      const numAscending = [...data].sort(
        (a, b) => b.quote.USD.percent_change_7d - a.quote.USD.percent_change_7d
      );
      console.log("sorted", numAscending);
      setCoinData(numAscending);
    }
  };
  return (
    <section className="text-gray-100 bg-body">
      <div
        className="mb-3 "
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div className="nameSearch" style={{ width: "30%" }}>
          <div class="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="text"
              class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search By Name"
              onChange={(event) => setNameSearch(event.target.value)}
              value={nameSearch}
            />

            <button
              class="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
              type="button"
              id="button-addon3"
              onClick={() => {
                searchByName();
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div
          className="filterbyVolume"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",

            width: "30%",
          }}
        >
          <div>
            <h1>Filter By Volume</h1>
          </div>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={groupButtonStyles}
              onClick={() => filterbyVolume(500000)}
            >
              {">"}500k
            </button>
            <button
              type="button"
              style={{ borderRadius: 0 }}
              className={groupButtonStyles}
              onClick={() => filterbyVolume(1000000)}
            >
              {">"}1000k
            </button>
            <button
              type="button"
              className={groupButtonStyles}
              style={{
                borderRadius: 0,
                borderTopRightRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
              }}
              onClick={() => filterbyVolume(2000000)}
            >
              {">"}2000k
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex py-20 md:flex-row flex-col items-center">
        {
          <Table>
            <TableHead>
              <TableHeadRow>
                <HeaderCell>#</HeaderCell>
                <HeaderCellLeading>name</HeaderCellLeading>
                <HeaderCell>
                  {" "}
                  <button onClick={() => sortingData(coinData, "price")}>
                    {" "}
                    price
                  </button>
                </HeaderCell>
                <HeaderCell>
                  {" "}
                  <button onClick={() => sortingData(coinData, "24h")}>
                    24h %
                  </button>
                </HeaderCell>
                <HeaderCell>
                  {" "}
                  <button onClick={() => sortingData(coinData, "7d")}>
                    7d %
                  </button>
                </HeaderCell>
                <HeaderCell>
                  {" "}
                  <button onClick={() => sortingData(coinData, "marketcap")}>
                    market cap
                  </button>
                </HeaderCell>
                <HeaderCell>
                  {" "}
                  <button onClick={() => sortingData(coinData, "volume")}>
                    volume
                  </button>
                </HeaderCell>
                <HeaderCell>supply</HeaderCell>
                <HeaderCell>change %</HeaderCell>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {coinData?.map((coin, index) => {
                return (
                  <TableRow key={index}>
                    <DataCell>{coin.cmc_rank}</DataCell>
                    <DataCellLeading>
                      <span>
                        <Link
                          href={coin.name}
                          onClick={(e) => handleCoinNav(coin)}
                          className="hover:text-purple-400"
                        >
                          {coin.name}
                        </Link>
                        &nbsp;
                        <i className=" not-italic text-gray-600 text-xs">
                          {coin.symbol}
                        </i>
                      </span>
                    </DataCellLeading>
                    <DataCell isIncrement={handlePrice(index).isIncrement}>
                      ${formatNum(coin.quote.USD.price)}
                    </DataCell>
                    <DataCell
                      isIncrement={
                        coin.quote.USD.percent_change_24h > 0 ? true : false
                      }
                    >
                      {formatNum(coin.quote.USD.percent_change_24h)}%
                    </DataCell>
                    <DataCell
                      isIncrement={
                        coin.quote.USD.percent_change_7d > 0 ? true : false
                      }
                    >
                      {formatNum(coin.quote.USD.percent_change_7d)}%
                    </DataCell>
                    <DataCell>${formatNum(coin.quote.USD.market_cap)}</DataCell>
                    <DataCell>${formatNum(coin.quote.USD.volume_24h)}</DataCell>
                    <DataCell>${formatNum(coin.total_supply)}</DataCell>
                    <DataCell
                      isIncrement={
                        coin.quote.USD.percent_change_7d > 0 ? true : false
                      }
                    >
                      {formatNum(coin.quote.USD.volume_change_24h)}%
                    </DataCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        }
      </div>
    </section>
  );
}
