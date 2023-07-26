import { Button } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { CoinMarketContext } from "../context/context";
import CoinSelectBox from "./components/CoinSelectBox";
import CoinDetails from "./components/CoinDetails";
import {
  DataCellLeading,
  HeaderCellLeading,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "./components/Table";
import { Tooltip } from "flowbite-react";

function Compare() {
  let { getTopTenCoins } = useContext(CoinMarketContext);
  let [coinData, setCoinData] = useState([]);
  let [selectedFirst, setSelectedFirst] = useState([]);
  let [selectedSecond, setSelectedSecond] = useState([]);
  let [selectedThird, setSelectedThird] = useState([]);
  let [selectedFourth, setSelectedFourth] = useState([]);
  let [showThird, setShowThird] = useState(false);
  let [showFourth, setShowFourth] = useState(false);

  // ##### FAULTY CODE ##### //
  // let [comboBoxArray, setComboBoxArray] = useState([0, 1]);
  // let [selected, setSelected] = useState([]);
  // let [count, setCount] = useState(0);
  // let i = 2;

  useEffect(() => {
    const getJSON = async function () {
      try {
        let apiResponse = await getTopTenCoins();
        setCoinData(apiResponse);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (getTopTenCoins) getJSON();
  }, [getTopTenCoins]);

  // ##### FAULTY CODE #####
  // const handleAdd = () => {
  //   // setCount(count++);
  //   setComboBoxArray((prevArr) => [...prevArr, i]);
  //   i = i + 1;
  //   console.log(i, comboBoxArray);
  // };
  // // console.log("selected:", selected);

  // function checkSelectedCoin(selectedCoin) {
  //   // let existing = selected.findIndex((coin) => coin.id === sel=ectedCoin.id);
  //   // console.log(existing);
  //   // if (existing >= 0) setSelected((prevState) => prevState.splice(existing,1, selectedCoin));
  //   setSelected((prevState) => [...prevState, selectedCoin]);
  // }

  return (
    <section id="compare" className="text-gray-100">
      <div className="container mx-auto pt-16 flex justify-center">
        <h1 className="capitalize mx-auto text-4xl font-bold p-4 border-b-4 border-purple-500 ">
          compare coins
        </h1>
      </div>
      <div className="container mx-auto">
        <div className="mx-auto flex px-10 py-24 md:flex-row flex-wrap gap-6 justify-center items-center ">
          {/* ##### FAULTY CODE ##### */}
          {/* {comboBoxArray.map((num) => (
            <CoinSelectBox key={num} data={coinData} getSelectedCoin={checkSelectedCoin} />
          ))} */}
          <CoinSelectBox
            data={coinData}
            getSelectedCoin={(selectedCoin) =>
              setSelectedFirst((prevState) => [selectedCoin])
            }
          />
          <CoinSelectBox
            data={coinData}
            getSelectedCoin={(selectedCoin) =>
              setSelectedSecond((prevState) => [selectedCoin])
            }
          />
          {showThird && (
            <CoinSelectBox
              data={coinData}
              getSelectedCoin={(selectedCoin) =>
                setSelectedThird((prevState) => [selectedCoin])
              }
            />
          )}
          {showFourth && (
            <CoinSelectBox
              data={coinData}
              getSelectedCoin={(selectedCoin) =>
                setSelectedFourth((prevState) => [selectedCoin])
              }
            />
          )}

          <Tooltip content="Add Coin to Compare" arrow={false}>
            <Button
              variant="gradient"
              color="purple"
              size="md"
              className={`capitalize mx-auto ${
                showThird ? "hidden" : ""
              } rounded-full`}
              onClick={() => setShowThird(true)}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </Button>
          </Tooltip>
          <Tooltip content="Add Coin to Compare" arrow={false}>
            <Button
              variant="gradient"
              color="purple"
              size="md"
              className={`capitalize mx-auto ${
                showFourth ? "hidden" : "" || !showThird ? "hidden" : ""
              } rounded-full`}
              onClick={() => setShowFourth(true)}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </Button>
          </Tooltip>
        </div>

        {selectedFirst.length > 0 && selectedSecond.length > 0 && (
          <div className="w-full flex">
            <Table>
              <TableHead>
                <HeaderCellLeading>Properties</HeaderCellLeading>
              </TableHead>
              <TableBody>
                <TableRow>
                  <DataCellLeading>Price</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>Market Cap Rank</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>Market Cap</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>Diluted Market Cap</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>Market Cap Dominance</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>{"Volume (24 Hours)"}</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>{"Change % (24 Hours)"}</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>{"Change % (7 Days)"}</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>{"Change % (30 Days)"}</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>{"Change % (60 Days)"}</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>{"Change % (90 Days)"}</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>Max Supply</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>Circulating Supply</DataCellLeading>
                </TableRow>
                <TableRow>
                  <DataCellLeading>Total Supply</DataCellLeading>
                </TableRow>
              </TableBody>
            </Table>
            {selectedFirst.map((coin, index) => {
              return <CoinDetails key={index} data={coin} />;
            })}
            {selectedSecond.map((coin, index) => {
              return <CoinDetails key={index} data={coin} />;
            })}
            {selectedThird.length > 0 &&
              selectedThird.map((coin, index) => {
                return <CoinDetails key={index} data={coin} />;
              })}
            {selectedFourth.length > 0 &&
              selectedFourth.map((coin, index) => {
                return <CoinDetails key={index} data={coin} />;
              })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Compare;
