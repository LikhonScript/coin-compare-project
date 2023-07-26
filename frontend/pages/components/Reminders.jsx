import React, { useState } from "react";
import DataContext from "./DataContext";
import axios from "axios";
import { useEffect } from "react";

const Reminders = ({ tempData }) => {
  const options = [
    { label: "Bitcoin", value: "Bitcoin" },

    { label: "Ethereum", value: "Ethereum" },

    { label: "Tether", value: "Tether" },
    { label: "BNB", value: "BNB" },
    { label: "XRP", value: "XRP" },
    { label: "Cardano", value: "Cardano" },
    { label: "Dogecoin", value: "Dogecoin" },
    { label: "Solana", value: "Solana" },
    { label: "Polygon", value: "Polygon" },
  ];
  const data = React.useContext(DataContext);
  const [value, setValue] = React.useState("Bitcoin");
  let [preferedDta, setPreferedData] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPrefernces, setUserPreferences] = React.useState([]);
  useEffect(() => {
    const tempGetUser = async () => {
      await getUser();
    };
    tempGetUser();
  }, []);

  const getCoinData = async () => {
    try {
      const coinsdata = await getTopTenCoins();
      console.log(coinsdata);
      const filteredcoin = coinsdata.filter((curElem) => {
        return curElem.name == value;
      });

      updatePreference(...filteredcoin);
      console.log(...filteredcoin);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getUser = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    });
    console.log("user data", data);
    setUserName(data.user.name);
    setUserEmail(data.user.email);
    setUserPreferences(data.user.prefernces);

    return data;
  };
  const sendEmail = async (filteredData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/sendemails",
        {
          name: `${userName}`,
          email: "adeel.saeed158@gmail.com",
          details: `A new reminder is added
           Name: ${filteredData.name} Rank: ${filteredData.cmc_rank} Maximum Supply: ${filteredData.max_supply} Price: ${filteredData.quote.USD.price} Market Cap: ${filteredData.quote.USD.market_cap}`,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const updatePreference = async (filteredData) => {
    const data = await getUser();
    console.log("Previously added", data.user.prefernces);
    console.log("user preferences ", userPrefernces);
    const res = await axios.put(
      `http://localhost:4000/api/v1/user/preferences/${data.user._id}`,
      {
        info: filteredData,
      },
      { withCredentials: true }
    );

    const updatedData = await getUser();
    console.log("newly added", updatedData.user.prefernces);
    setUserPreferences(updatedData.user.prefernces);
    console.log("function filtererd data", filteredData);
    sendEmail(filteredData);
  };
  const getTopTenCoins = async () => {
    try {
      const res = await fetch("/api/getTopTen");
      const data = await res.json();
      return data.data.data;
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const removePreference = async (removeData) => {
    const data = await getUser();
    console.log("user preferences ", userPrefernces);
    const res = await axios.put(
      `http://localhost:4000/api/v1/user/removepreferences/${data.user._id}`,
      {
        id: removeData._id,
      },
      { withCredentials: true }
    );
    const updatedData = await getUser();
    setUserPreferences(updatedData.user.prefernces);
  };
  return (
    <div>
      <label>
        What do we eat?
        <div
          style={{
            width: "50%",

            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <select value={value} onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </label>

      <p>We eat {value}!</p>
      <button
        type="submit"
        onClick={() => getCoinData()}
        class="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded-full text-lg"
      >
        Submit
      </button>

      <br />
      <br />
      <br />
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Name
              </th>

              <th scope="col" class="py-3 px-6">
                Symbol
              </th>
              <th scope="col" class="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userPrefernces.length > 0 &&
              userPrefernces.map((curElem, index) => {
                return (
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index + 1}
                  >
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {curElem.info.name}
                    </th>
                    <td class="py-4 px-6">{curElem.info.symbol}</td>
                    {/* <td class="py-4 px-6">{curElem.country}</td>
                    <td class="py-4 px-6">{curElem.contact}</td> */}
                    <td class="py-4 px-6">
                      {" "}
                      <button
                        onClick={(e) => removePreference(curElem)}
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminders;
