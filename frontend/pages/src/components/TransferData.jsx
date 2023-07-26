import React, { useEffect } from "react";

const TransferData = () => {
  const { getTopTenCoins } = useContext(CoinMarketContext);

  let [coindata, setCoinData] = useState();
  const getJSON = async function () {
    try {
      let apiResponse = await getTopTenCoins();

      setCoinData(apiResponse);
      console.log(apiResponse);
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    if (getTopTenCoins) getJSON();
  }, []);

  return <div>TransferData</div>;
};

export default TransferData;
