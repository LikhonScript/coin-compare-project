import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../../components/FileUploader";
import convertImageToBase64 from "../../../components/ImageBase64";
import { uploadImage } from "../../../components/ImageUpload";

const AddCoinForm = () => {
  const [title, setTitle] = useState("");
  const [imageName, setImageName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState("");
  const [currentExplorer, setCurrentExplorer] = useState("");
  const [conAddress, setConAddress] = useState("");
  const [totalSupply, setTotalSupply] = useState();
  const [maxSupply, setMaxSupply] = useState();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const getUser = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    });
    console.log("user data", data);
    return data.user;
  };
  const onDropPic = (acceptedFiles, rejectedFiles, imgNameCnic) => {
    if (rejectedFiles.length > 0) {
      return;
    } else if (acceptedFiles) {
      convertImageToBase64(acceptedFiles[0], (result, success) => {
        if (success) {
          uploadImage(result, (url, success) => {
            if (success) {
              setImage(url);
              setImageName(acceptedFiles[0].name);
              console.log(url);
            }
          });
        }
      });
    }
  };

  const coinFormSubmitHandler = async (event) => {
    event.preventDefault();

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/product/new",
      {
        Title: `${title}`,
        Symbol: `${symbol}`,
        Website: `${website}`,
        maxSupply: maxSupply,
        totalSupply: totalSupply,
        contractAddress: `${conAddress}`,
        description: `${description}`,
        explorer: `${currentExplorer}`,
        image: image,
      },
      { withCredentials: true }
    );
    console.log(data);
    navigate("/usercoins");
  };
  return (
    <form
      class="text-gray-600 body-font relative"
      onSubmit={coinFormSubmitHandler}
    >
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Coin Form{" "}
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            {" "}
            Fill the form with your Coin details
          </p>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="title"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Symbol
                </label>
                <input
                  type="text"
                  id="email"
                  name="symbol"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setSymbol(e.target.value)}
                  value={symbol}
                  required
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Website
                </label>
                <input
                  type="text"
                  id="email"
                  name="website"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
                  required
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Coin Image
                </label>

                <FileUploader
                  placeholder={imageName ? imageName : "Click here to upload"}
                  accept={["image/jpeg", "image/png", "image/bmp"]}
                  maxFiles={1}
                  maxSize={1000000}
                  onDrop={(acceptedFiles, rejectedFiles) =>
                    onDropPic(acceptedFiles, rejectedFiles, "Image")
                  }
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Explorer
                </label>
                <input
                  type="text"
                  id="email"
                  name="explorerDrop"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setCurrentExplorer(e.target.value)}
                  value={currentExplorer}
                  required
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Contract Address{" "}
                </label>
                <input
                  type="text"
                  id="email"
                  name="contractAddress"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setConAddress(e.target.value)}
                  value={conAddress}
                  required
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Total Supply{" "}
                </label>
                <input
                  type="number"
                  id="email"
                  name="totalSupply"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setTotalSupply(e.target.value)}
                  value={totalSupply}
                  required
                />
              </div>
            </div>
            <div class="p-2 w-1/2">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Max Supply{" "}
                </label>
                <input
                  type="number"
                  id="email"
                  name="maxSupply"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setMaxSupply(e.target.value)}
                  value={maxSupply}
                  required
                />
              </div>
            </div>

            <div class="p-2 w-full">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-600">
                  Description
                </label>
                <textarea
                  id="message"
                  name="description"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                ></textarea>
              </div>
            </div>
            <div class="p-2 w-full">
              <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCoinForm;
