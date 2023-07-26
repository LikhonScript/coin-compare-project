import { useRouter } from "next/router";
import { useDebugValue, useEffect, useState } from "react";
import Graph from "./components/Graph";
import { formatNum } from "./components/section-components/CoinTable";
import Footer from "./components/section-components/Footer";
import Header from "./components/section-components/Header";

const groupButtonStyles =
  "py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-blue-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-blue-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-blue-gray-600 dark:focus:ring-blue-500 dark:focus:text-white";
const converterInputStyles =
  "rounded-none rounded-r-lg bg-blue-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-blue-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

export default function CoinPage() {
  const [coinData, setCoinData] = useState([]);
  const [inputUSD, setInputUSD] = useState(0);
  const [inputCoin, setInputCoin] = useState(1);
  const [graphValue, setGraphValue] = useState();

  function handleCoinPriceChange(event) {
    setInputCoin(event.target.value);
    setInputUSD(
      (coinData[0]?.quote?.USD?.price * event.target.value).toFixed(2)
    );
  }
  function handleUSDPrice(event) {
    setInputUSD(event.target.value);
    setInputCoin(
      (event.target.value / coinData[0]?.quote?.USD?.price).toFixed(4)
    );
  }

  useEffect(() => {
    setCoinData((prevState) => [JSON.parse(localStorage.getItem("coinData"))]);
    setInputUSD(
      JSON.parse(localStorage.getItem("coinData"))?.quote?.USD?.price.toFixed(2)
    );
  }, []);

  function formatDate(date) {
    const DateInSeconds = Date.parse(date);
    return `${new Date(DateInSeconds).toLocaleDateString()} ${new Date(
      DateInSeconds
    ).toLocaleTimeString()}`;
  }

  return (
    <div>
      <Header />
      {coinData.length > 0 &&
        coinData.map((coin, index) => {
          return (
            <main
              key={index}
              className="container mx-auto my-10 flex items-center justify-between text-gray-100"
            >
              <div id="leftBox" className="basis-4/6 p-4">
                <span className="bg-blue-gray-700/50 p-2 rounded-md text-sm">
                  Rank #{coin.cmc_rank}
                </span>
                <div className="flex justify-between items-center text-3xl font-bold my-4">
                  <h1>
                    {coin.name} Price Chart{" "}
                    <span className="uppercase mx-4">{`(${coin.symbol}/USD)`}</span>
                  </h1>
                  <h1>
                    <span>${formatNum(coin.quote.USD.price)}</span>
                  </h1>
                </div>

                <p className=" my-2 text-sm ">
                  Last updated {formatDate(coin.last_updated)}.
                </p>
                <div className="flex flex-wrap justify-between my-4">
                  <div
                    class="inline-flex rounded-md shadow-sm"
                    role="group"
                  ></div>
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      type="button"
                      className={groupButtonStyles}
                      onClick={() => setGraphValue(24)}
                    >
                      24h
                    </button>
                    <button
                      type="button"
                      style={{ borderRadius: 0 }}
                      className={groupButtonStyles}
                      onClick={() => setGraphValue(7)}
                    >
                      7d
                    </button>
                    <button
                      type="button"
                      style={{ borderRadius: 0 }}
                      className={groupButtonStyles}
                      onClick={() => setGraphValue(14)}
                    >
                      14d
                    </button>
                    <button
                      type="button"
                      style={{ borderRadius: 0 }}
                      className={groupButtonStyles}
                      onClick={() => setGraphValue(30)}
                    >
                      30d
                    </button>

                    <button
                      type="button"
                      className={groupButtonStyles}
                      style={{
                        borderRadius: 0,
                        borderTopRightRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                      }}
                      onClick={() => setGraphValue(90)}
                    >
                      90d
                    </button>
                  </div>
                </div>
                <Graph graphValue={graphValue} />

                <div className="my-4 w-full">
                  <table className="mx-auto text-blue-gray-200">
                    <tr className="bg-blue-gray-600/50">
                      <td className="px-10 border py-3 border-blue-gray-700 text-center">
                        1h
                      </td>
                      <td className="px-10 border py-3 border-blue-gray-700 text-center">
                        24h
                      </td>
                      <td className="px-10 border py-3 border-blue-gray-700 text-center">
                        7d
                      </td>
                      <td className="px-10 border py-3 border-blue-gray-700 text-center">
                        30d
                      </td>
                      <td className="px-10 border py-3 border-blue-gray-700 text-center">
                        60d
                      </td>
                      <td className="px-10 border py-3 border-blue-gray-700 text-center">
                        90d
                      </td>
                    </tr>
                    <tr>
                      <td className="px-10 py-3 border border-blue-gray-700 text-center">
                        {formatNum(coin.quote.USD.percent_change_1h)}%
                      </td>
                      <td className="px-10 py-3 border border-blue-gray-700 text-center">
                        {formatNum(coin.quote.USD.percent_change_24h)}%
                      </td>
                      <td className="px-10 py-3 border border-blue-gray-700 text-center">
                        {formatNum(coin.quote.USD.percent_change_7d)}%
                      </td>
                      <td className="px-10 py-3 border border-blue-gray-700 text-center">
                        {formatNum(coin.quote.USD.percent_change_30d)}%
                      </td>
                      <td className="px-10 py-3 border border-blue-gray-700 text-center">
                        {formatNum(coin.quote.USD.percent_change_60d)}%
                      </td>
                      <td className="px-10 py-3 border border-blue-gray-700 text-center">
                        {formatNum(coin.quote.USD.percent_change_90d)}%
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="w-5/12 mx-auto">
                    <div className="w-full flex justify-between py-3 border-b border-blue-gray-800">
                      <span>Market Cap</span>
                      <span>${formatNum(coin.quote.USD.market_cap)}</span>
                    </div>
                    <div className="w-full flex justify-between py-3 border-b border-blue-gray-800">
                      <span className="capitalize">
                        fully diluted valuation
                      </span>
                      <span>
                        ${formatNum(coin.quote.USD.fully_diluted_market_cap)}
                      </span>
                    </div>
                    <div className="w-full flex justify-between py-3 border-b border-blue-gray-800">
                      <span className="capitalize">market pairs</span>
                      <span>{coin.num_market_pairs}</span>
                    </div>
                  </div>
                  <div className="w-5/12 mx-auto">
                    <div className="w-full flex justify-between py-3 border-b border-blue-gray-800">
                      <span>Max Supply</span>
                      <span>
                        {coin.max_supply
                          ? `$${formatNum(coin.quote.USD.market_cap)}`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="w-full flex justify-between py-3 border-b border-blue-gray-800">
                      <span className="capitalize">circulating supply</span>
                      <span>${formatNum(coin.circulating_supply)}</span>
                    </div>
                    <div className="w-full flex justify-between py-3 border-b border-blue-gray-800">
                      <span className="capitalize">total supply</span>
                      <span>${formatNum(coin.total_supply)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ##### RIGHT BOX ##### */}
              <div id="rightBox" className="basis-2/6">
                <div className="rounded-lg bg-blue-gray-700/50 p-2 mx-8">
                  <h1 className="text-xl font-bold text-gray-100 my-4">
                    Convert {coin.name} to USD
                  </h1>

                  <div className="flex flex-col gap-4">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-blue-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-blue-gray-600 dark:text-gray-300 dark:border-gray-600">
                        {coin.symbol}
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={inputCoin}
                        onChange={handleCoinPriceChange}
                        className={converterInputStyles}
                      />
                    </div>

                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-blue-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-blue-gray-600 dark:text-gray-300 dark:border-gray-600">
                        USD
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={inputUSD}
                        onChange={handleUSDPrice}
                        className={converterInputStyles}
                      />
                    </div>
                  </div>
                  <p className="bold uppercase text-sm my-1">
                    1 {coin.symbol} = ${formatNum(coin.quote.USD.price)}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-gray-700/50 p-4 m-8">
                  <h1 className="text-xl font-bold text-gray-100 my-4">
                    {coin.symbol} Price Statistics
                  </h1>
                  <table className="w-full mx-auto text-sm text-blue-gray-100 font-light">
                    <tbody>
                      <tr className="w-full border-b border-gray-700 py-3 flex items-center justify-between">
                        <td>{coin.name} Price</td>
                        <td>
                          <b>{formatNum(coin.quote.USD.price)}%</b>
                        </td>
                      </tr>
                      <tr className="w-full border-b border-gray-700 py-3 flex items-center justify-between">
                        <td>Market Cap Rank</td>
                        <td>
                          <b>#{coin.cmc_rank}</b>
                        </td>
                      </tr>
                      <tr className="w-full border-b border-gray-700 py-3 flex items-center justify-between">
                        <td>Market Cap</td>
                        <td>
                          <b>${formatNum(coin.quote.USD.market_cap)}</b>
                        </td>
                      </tr>
                      <tr className="w-full border-b border-gray-700 py-3 flex items-center justify-between">
                        <td>Market Cap Dominance</td>
                        <td>
                          <b>
                            {formatNum(coin.quote.USD.market_cap_dominance)}%
                          </b>
                        </td>
                      </tr>
                      <tr className="w-full border-b border-gray-700 py-3 flex items-center justify-between">
                        <td>Trading Volume 24h</td>
                        <td>
                          <b>${formatNum(coin.quote.USD.volume_24h)}</b>
                        </td>
                      </tr>
                      <tr className="w-full border-b border-gray-700 py-3 flex items-center justify-between">
                        <td>Self Reported Market Cap</td>
                        <td>
                          <b>
                            {coin.self_reported_market_cap
                              ? formatNum(coin.self_reported_market_cap)
                              : "N/A"}
                          </b>
                        </td>
                      </tr>
                      <tr className="w-full border-b border-gray-700 py-3 flex items-center justify-between">
                        <td>Self Reported Circulating Supply</td>
                        <td>
                          <b>
                            {coin.self_reported_circulating_supply
                              ? formatNum(coin.self_reported_market_cap)
                              : "N/A"}
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          );
        })}
      <Footer />
    </div>
  );
}
