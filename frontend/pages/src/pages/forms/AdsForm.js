import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FileUploader from "../../../components/FileUploader";
import convertImageToBase64 from "../../../components/ImageBase64";
import { uploadImage } from "../../../components/ImageUpload";

const AdsForm = () => {
  const [title, setTitle] = useState("");
  const [imageName, setImageName] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const adFormSubmitHandler = async (event) => {
    event.preventDefault();
    // let file = new FormData();
    // file.append("files", image);

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/ad/new",
      {
        Title: `${title}`,
        Website: `${website}`,
        Description: `${description}`,
        image: image,
      },
      { withCredentials: true }
    );
    console.log(data);
    navigate("/ads");
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
  return (
    <form
      class="text-gray-600 body-font relative"
      onSubmit={adFormSubmitHandler}
    >
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">
            Ad Form{" "}
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            {" "}
            Fill the form with your Ad Details
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

export default AdsForm;
