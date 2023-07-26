import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CoinMarketContext } from "../../../context/context";
import HeroInput from "../HeroInput";
import heroImg from "./../../../assets/img/hero-img.svg";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/navigation";

function Hero() {
  const { getTopTenCoins } = useContext(CoinMarketContext);
  const [coinData, setCoinData] = useState([]);
  const [filteredCoin, setFilteredCoin] = useState({});
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };
  const router = useRouter();
  const getJSON = async function () {
    try {
      let apiResponse = await getTopTenCoins();

      setCoinData(apiResponse);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleOnSelect = (coin) => {
    localStorage.setItem("coinData", JSON.stringify(coin));
    router.push(coin.slug);
  };
  const handleClear = () => {
    setFilteredCoin({});
    getJSON();
  };

  const formatResult = (coin) => {
    return (
      <>
        <span
          style={{ display: "block", textAlign: "left" }}
        >{`${coin.name} ${coin.symbol}`}</span>
      </>
    );
  };

  useEffect(() => {
    if (getTopTenCoins) getJSON();
    const time = setInterval(() => {
      getJSON();
    }, 20 * 1000);
  }, [router.pathname]);

  return (
    <section className="text-gray-100 body-font bg-body">
      <div className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium">
            Your Source for Real-Time Data
          </h1>
          <p className="mb-8 leading-relaxed">
            "Welcome to CoinCompare, your all-in-one platform for comprehensive
            insights into the thrilling world of cryptocurrencies and digital
            assets.
          </p>

          <div className="w-72">
            <ReactSearchAutocomplete
              items={coinData}
              fuseOptions={{ keys: ["symbol", "slug"] }}
              resultStringKeyName="name"
              onSelect={handleOnSelect}
              onClear={handleClear}
              formatResult={formatResult}
              onSearch={handleOnSearch}
              styling={{ zIndex: 4 }}
              autoFocus
              placeholder="Search Currency"
            />
          </div>
          {/* <HeroInput /> */}
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image src={heroImg} alt="Hero Image" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
