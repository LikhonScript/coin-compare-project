import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FileUploader from "../../../components/FileUploader";
import convertImageToBase64 from "../../../components/ImageBase64";
import { uploadImage } from "../../../components/ImageUpload";
const EditProfileForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [user, setUser] = useState({});

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/updateprofile`,
        {
          name: userName,
          email: email,
          country: country,
          contact: contact,
          image: image,
        },
        { withCredentials: true }
      );

      console.log(`updated user ${data} `);
      setUser(data.user);
      if (user.role == "Admin") navigate("/profile");
      else {
        navigate("/userprofile");
      }
    } catch (error) {
      console.log(error);
    }
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
    <div>
      <form
        onSubmit={handleUpdate}
        class="bg-grey-lighter min-h-screen flex flex-col"
      >
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">
              Fill the form to Edit Profile
            </h1>

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />

            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="country"
              placeholder="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
            <input
              type="text"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="contact"
              placeholder="contact"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />
            <FileUploader
              placeholder={imageName ? imageName : "Click here to upload"}
              accept={["image/jpeg", "image/png", "image/bmp"]}
              maxFiles={1}
              maxSize={1000000}
              onDrop={(acceptedFiles, rejectedFiles) =>
                onDropPic(acceptedFiles, rejectedFiles, "Image")
              }
            />
            <button
              type="submit"
              class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
