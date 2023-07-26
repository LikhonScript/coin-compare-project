import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDisplayAdTable = () => {
  const [adData, setAdData] = useState([]);
  var [link, setLink] = useState("");

  const getAdData = async (req, res) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/ads");

    const requestedAds = data.ads.filter((curElem) => {
      return curElem.isApproved == true;
    });

    console.log(requestedAds);
    setAdData(requestedAds);
  };
  useEffect(() => {
    getAdData();
  }, []);
  console.log(adData);

  return (
    <>
      {adData.length > 0 &&
        adData.map((curElem, index) => {
          link = `https://www.${curElem.Website}`;
          return (
            <div class="flex justify-center items-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 md:py-16">
              <div
                class="bg-white w-full md:w-1/2 py-4 shadow flex justify-center  max-w-7xl "
                key={index + 1}
              >
                <div class="px-8">
                  <h1 class="text-indigo-600  text-2xl md:text-4xl font-semibold my-4 text-center">
                    {curElem.Title}
                  </h1>
                  <div class="flex items-center justify-center space-x-10">
                    <div class="md:ml-[6px] flex flex-col items-center lg:flex-row  bg-white">
                      <img src={curElem.image} class=" " alt="image" />

                      <div class="px-5 py-10 text-black flex flex-col w-full lg:w-[70%] ">
                        <q class="text-sm -mt-5 -ml-5 md:-ml-0  text-left">
                          {curElem.Description}
                        </q>
                        <div class="mt-5 text-left -ml-5 md:text-right ">
                          <h1 class="font-bold text-lg">
                            {" "}
                            <a href={link}> Visit our website </a>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default UserDisplayAdTable;
