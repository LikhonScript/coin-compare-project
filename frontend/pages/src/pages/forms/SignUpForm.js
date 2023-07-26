import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FileUploader from "../../../components/FileUploader";
import convertImageToBase64 from "../../../components/ImageBase64";
import { uploadImage } from "../../../components/ImageUpload";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const options = [
    { value: "AF", label: "Afghanistan" },
    { value: "AL", label: "Albania" },
    { value: "DZ", label: "Algeria" },
    { value: "AD", label: "Andorra" },
    { value: "AO", label: "Angola" },
    { value: "AG", label: "Antigua and Barbuda" },
    { value: "AR", label: "Argentina" },
    { value: "AM", label: "Armenia" },
    { value: "AU", label: "Australia" },
    { value: "AT", label: "Austria" },
    { value: "AZ", label: "Azerbaijan" },
    { value: "BS", label: "Bahamas" },
    { value: "BH", label: "Bahrain" },
    { value: "BD", label: "Bangladesh" },
    { value: "BB", label: "Barbados" },
    { value: "BY", label: "Belarus" },
    { value: "BE", label: "Belgium" },
    { value: "BZ", label: "Belize" },
    { value: "BJ", label: "Benin" },
    { value: "BT", label: "Bhutan" },
    { value: "BO", label: "Bolivia" },
    { value: "BA", label: "Bosnia and Herzegovina" },
    { value: "BW", label: "Botswana" },
    { value: "BR", label: "Brazil" },
    { value: "BN", label: "Brunei" },
    { value: "BG", label: "Bulgaria" },
    { value: "BF", label: "Burkina Faso" },
    { value: "BI", label: "Burundi" },
    { value: "KH", label: "Cambodia" },
    { value: "CM", label: "Cameroon" },
    { value: "CA", label: "Canada" },
    { value: "CV", label: "Cape Verde" },
    { value: "CF", label: "Central African Republic" },
    { value: "TD", label: "Chad" },
    { value: "CL", label: "Chile" },
    { value: "CN", label: "China" },
    { value: "CO", label: "Colombia" },
    { value: "KM", label: "Comoros" },
    { value: "CG", label: "Congo" },
    { value: "CD", label: "Congo (Democratic Republic)" },
    { value: "CR", label: "Costa Rica" },
    { value: "HR", label: "Croatia" },
    { value: "CU", label: "Cuba" },
    { value: "CY", label: "Cyprus" },
    { value: "CZ", label: "Czech Republic" },
    { value: "DK", label: "Denmark" },
    { value: "DJ", label: "Djibouti" },
    { value: "DM", label: "Dominica" },
    { value: "DO", label: "Dominican Republic" },
    { value: "EC", label: "Ecuador" },
    { value: "EG", label: "Egypt" },
    { value: "MG", label: "Madagascar" },
    { value: "MW", label: "Malawi" },
    { value: "MY", label: "Malaysia" },
    { value: "MV", label: "Maldives" },
    { value: "ML", label: "Mali" },
    { value: "MT", label: "Malta" },
    { value: "MH", label: "Marshall Islands" },
    { value: "MR", label: "Mauritania" },
    { value: "MU", label: "Mauritius" },
    { value: "MX", label: "Mexico" },
    { value: "FM", label: "Micronesia" },
    { value: "MD", label: "Moldova" },
    { value: "MC", label: "Monaco" },
    { value: "MN", label: "Mongolia" },
    { value: "ME", label: "Montenegro" },
    { value: "MA", label: "Morocco" },
    { value: "MZ", label: "Mozambique" },
    { value: "MM", label: "Myanmar" },
    { value: "NA", label: "Namibia" },
    { value: "NR", label: "Nauru" },
    { value: "NP", label: "Nepal" },
    { value: "NL", label: "Netherlands" },
    { value: "NZ", label: "New Zealand" },
    { value: "NI", label: "Nicaragua" },
    { value: "NE", label: "Niger" },
    { value: "NG", label: "Nigeria" },
    { value: "NO", label: "Norway" },
    { value: "OM", label: "Oman" },
    { value: "PK", label: "Pakistan" },
    { value: "PW", label: "Palau" },
    { value: "PA", label: "Panama" },
    { value: "PG", label: "Papua New Guinea" },
    { value: "PY", label: "Paraguay" },
    { value: "PE", label: "Peru" },
    { value: "PH", label: "Philippines" },
    { value: "PL", label: "Poland" },
    { value: "PT", label: "Portugal" },
    { value: "QA", label: "Qatar" },
    { value: "RO", label: "Romania" },
    { value: "RU", label: "Russia" },
    { value: "RW", label: "Rwanda" },
    { value: "KN", label: "Saint Kitts and Nevis" },
    { value: "LC", label: "Saint Lucia" },
    { value: "VC", label: "Saint Vincent and the Grenadines" },
    { value: "WS", label: "Samoa" },
    { value: "SM", label: "San Marino" },
    { value: "ST", label: "Sao Tome and Principe" },
    { value: "SA", label: "Saudi Arabia" },
    { value: "SN", label: "Senegal" },
    { value: "RS", label: "Serbia" },
    { value: "SC", label: "Seychelles" },
    { value: "SL", label: "Sierra Leone" },
  ];
  useEffect(() => {
    getUser();
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
        withCredentials: true,
      });
      console.log({ ...data });
      if (data.success == true) {
        if (data.user.role == "User") navigate("/userhome");
        else {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log(`error${error}`);
    }
  };

  const userSignUpHandler = async (event) => {
    event.preventDefault();
    try {
      if (password === confirmPassword) {
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/user/register",
          {
            name: `${name}`,
            email: `${email}`,
            password: `${password}`,
            country: `${value}`,
            contact: `${contact}`,
            image: image,
          },
          {
            withCredentials: true,
          }
        );

        console.log(data.user);
        navigate("/login");
      } else {
        alert("password does not match ");
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
    <>
      <div className="container w-full max-w-sm my-20 mx-auto">
        <form
          class="bg-blue-gray-700 px-6 py-8 text-black w-full rounded-lg shadow-sm"
          onSubmit={userSignUpHandler}
        >
          <h1 class="mb-8 text-3xl text-center capitalize text-blue-gray-100 font-bold">
            Sign up
          </h1>

          <input
            type="text"
            className="block border border-gray-100/50 w-full p-3 rounded mb-4 bg-blue-gray-700/50 text-blue-gray-100"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="text"
            className="block  border border-gray-100/50 w-full p-3 rounded mb-4 bg-blue-gray-700/50 text-blue-gray-100"
            name="name"
            placeholder="User Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <div className="flex gap-6 w-full">
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="password"
              class="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

          <FileUploader
            placeholder={imageName ? imageName : "Click here to upload"}
            accept={["image/jpeg", "image/png", "image/bmp"]}
            maxFiles={1}
            maxSize={1000000}
            onDrop={(acceptedFiles, rejectedFiles) =>
              onDropPic(acceptedFiles, rejectedFiles, "Image")
            }
          />

          <select
            value={value}
            onChange={handleChange}
            class="block border border-grey-light w-full p-3 rounded mb-4"
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="contact"
            placeholder="contact"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
          />

          <button
            type="submit"
            class="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded-full text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
